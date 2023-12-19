import {
  IGenericResponse,
  IPaginationOptions,
  UserInfoFromToken,
} from '../../../interfaces/common'
import mongoose, { SortOrder } from 'mongoose'
import httpStatus from 'http-status'
import { IDonation, IDonationFilters } from './donation.interface'
import Donation from './donation.modal'
import { User } from '../User/user.modal'
import ApiError from '../../../errors/ApiErrors'
import { donationFilterableField } from './donation.constant'
import { paginationHelpers } from '../../../helpers/paginationHelpers'

const bloodRequest = async (
  payload: Partial<IDonation>,
  userInfo: UserInfoFromToken
): Promise<IDonation | null> => {
  const user = await User.findById(userInfo.id)
  if (!user) {
    throw new ApiError(httpStatus.CONFLICT, 'Your profile does not exist!!!')
  }

  const donor = await User.findById(payload.donnerId)

  if (!donor) {
    throw new ApiError(httpStatus.CONFLICT, 'Donor does not exist!!!')
  }

  if (payload.bloodGroup != donor.bloodGroup) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "Donor's blood group is not matching with your request."
    )
  }
  payload.userId = userInfo.id
  const session = await mongoose.startSession()

  let result
  try {
    session.startTransaction()
    result = await Donation.create([payload], { session })

    await User.findOneAndUpdate(
      { _id: payload.donnerId },
      { $inc: { notification: 1 } },
      {
        session,
      }
    )
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  return result[0]
}

const getAllDonationInfo = async (
  filters: IDonationFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IDonation[]>> => {
  const { searchTerm, ...filtersData } = filters
  const andConditions = []

  // for filter data
  if (searchTerm) {
    andConditions.push({
      $or: donationFilterableField.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    })
  }

  // for exact match user and condition
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  // if no condition is given
  const query = andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Donation.find(query)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate(['userId', 'donnerId'])

  const total = await Donation.countDocuments(query)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleDonationInfo = async (id: string): Promise<IDonation | null> => {
  const result = await Donation.findById(id).populate(['userId', 'donnerId'])

  if (!result) {
    throw new ApiError(httpStatus.CONFLICT, 'Info is not exist!!!')
  }
  return result
}

const acceptRequest = async (
  id: string,
  userInfo: UserInfoFromToken
): Promise<IDonation | null> => {
  const donationRequest = await Donation.findById(id)

  if (!donationRequest) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'There is info with this id!!!')
  }

  const donor = await User.findById(userInfo.id)
  if (!donor) {
    throw new ApiError(httpStatus.CONFLICT, 'Your profile does not exist!!!')
  }

  if (userInfo.id.toString() !== donationRequest.donnerId.toString()) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'This request is not for you!!!'
    )
  }
  if (donationRequest.status != 'pending') {
    throw new ApiError(httpStatus.BAD_REQUEST, `Already accept the request!!!`)
  }

  const session = await mongoose.startSession()

  let result

  try {
    session.startTransaction()

    await User.findOneAndUpdate(
      { _id: donationRequest.donnerId },
      {
        $inc: { notification: -1, totalDonation: 1 },
        $set: { lastDonation: new Date(), available: false },
      },
      {
        session,
      }
    )

    result = await Donation.findByIdAndUpdate(
      id,
      { $set: { status: 'accept' } },
      { new: true, session }
    )

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  return result
}

const cancelRequest = async (
  id: string,
  userInfo: UserInfoFromToken
): Promise<IDonation | null> => {
  const donationRequest = await Donation.findById(id)

  if (!donationRequest) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'There is info with this id!!!')
  }

  const user = await User.findById(userInfo.id)
  if (!user) {
    throw new ApiError(httpStatus.CONFLICT, 'Your profile does not exist!!!')
  }

  if (
    userInfo.id.toString() !== donationRequest.donnerId.toString() &&
    userInfo.id.toString() !== donationRequest.userId.toString()
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'This is not for you!!!')
  }
  if (donationRequest.status != 'pending') {
    throw new ApiError(httpStatus.BAD_REQUEST, `Already accept the request!!!`)
  }

  const session = await mongoose.startSession()

  let result

  try {
    session.startTransaction()

    await User.findOneAndUpdate(
      { _id: donationRequest.donnerId },
      {
        $inc: { notification: -1 },
      },
      {
        session,
      }
    )

    result = await Donation.findByIdAndDelete(id, { session })

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  return result
}

export const DonationService = {
  getAllDonationInfo,
  getSingleDonationInfo,
  bloodRequest,
  cancelRequest,
  acceptRequest,
}
