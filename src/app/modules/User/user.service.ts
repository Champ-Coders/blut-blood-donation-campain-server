import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiErrors'
import {
  IChangePassword,
  ILoginUser,
  IRefreshTokenResponse,
  IUserFilters,
  userFilterableField,
} from './user.constant'
import { ILoginUserResponse, IUser } from './user.interface'
import { User } from './user.modal'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import {
  IGenericResponse,
  IPaginationOptions,
  UserInfoFromToken,
} from '../../../interfaces/common'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import { SortOrder } from 'mongoose'

const createUser = async (
  user: IUser
): Promise<{
  userInfo: IUser
  accessToken: string
  refreshToken: string
}> => {
  const checkNumber = await User.findOne({ phoneNumber: user.phoneNumber })
  const checkEmail = await User.findOne({ email: user.email })

  if (checkEmail) {
    throw new ApiError(httpStatus.CONFLICT, 'Already used this email!!!')
  }
  if (checkNumber) {
    throw new ApiError(httpStatus.CONFLICT, 'Already used this phone number!!!')
  }
  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user!')
  }
  const result = await User.findById(createdUser._id)
  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'INTERNAL_SERVER_ERROR, Please try again later!!!'
    )
  }
  const tokenInfo = {
    id: createdUser.id,
    email: user.email,
    role: 'user',
    imgUrl: user.imgUrl,
  }

  const accessToken = jwtHelpers.createToken(
    tokenInfo,
    config.jwt.jwt_secret as Secret,
    config.jwt.access_token_expires_in as string
  )

  const refreshToken = jwtHelpers.createToken(
    tokenInfo,
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  )

  return { userInfo: result, accessToken, refreshToken }
}

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload

  const isUserExist = await User.isUserExist(email)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist.")
  }

  if (!(await User.isPasswordMatched(password, isUserExist.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect.')
  }

  const { role, id, imgUrl } = isUserExist
  const accessToken = jwtHelpers.createToken(
    { id, email, role, imgUrl },
    config.jwt.jwt_secret as Secret,
    config.jwt.access_token_expires_in as string
  )
  const refreshToken = jwtHelpers.createToken(
    { id, email, role, imgUrl },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  )
  return {
    accessToken,
    refreshToken,
  }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token_secret as Secret
    )
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
  }

  const { email } = verifiedToken

  const isUserExist = await User.isUserExist(email)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  //generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      email: isUserExist.email,
      role: isUserExist.role,
      imgUrl: isUserExist.imgUrl,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.access_token_expires_in as string
  )

  return {
    accessToken: newAccessToken,
  }
}

const myProfile = async (
  userInfo: UserInfoFromToken
): Promise<IUser | null> => {
  const result = await User.findById(userInfo.id).select('+notification')
  if (!result) {
    throw new ApiError(httpStatus.CONFLICT, 'Your profile is not exist!!!')
  }
  return result
}

const updateProfile = async (
  payload: Partial<IUser>,
  userInfo: UserInfoFromToken
): Promise<IUser | null> => {
  const isUserExist = await User.findById(userInfo.id)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  // if (payload.phoneNumber) {
  //   const checkNumber = await User.findOne({
  //     phoneNumber: payload.phoneNumber,
  //   })

  //   if (checkNumber) {
  //     throw new ApiError(httpStatus.CONFLICT, 'Already used this number!!!')
  //   }
  // }

  const result = await User.findOneAndUpdate({ _id: userInfo.id }, payload, {
    new: true,
  })
  return result
}

const changePassword = async (
  userInfo: UserInfoFromToken,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload

  const isUserExist = await User.findById(userInfo.id).select({
    password: true,
  })

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  if (!(await User.isPasswordMatched(oldPassword, isUserExist.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect')
  }
  isUserExist.password = newPassword
  isUserExist.save()
}

const getAllUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  // for filter data
  if (searchTerm) {
    andConditions.push({
      $or: userFilterableField.map(field => ({
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
  const result = await User.find(query)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await User.countDocuments(query)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getIndividualGroupUsers = async (
  bloodGroup: string,
  filters: IUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []
  // for blood Group filter
  andConditions.push({
    $and: [{ bloodGroup: bloodGroup }],
  })

  // for filter data
  if (searchTerm) {
    andConditions.push({
      $or: userFilterableField.map(field => ({
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
  const result = await User.find(query)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await User.countDocuments(query)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id)
  if (!result) {
    throw new ApiError(httpStatus.CONFLICT, 'User is not exist!!!')
  }
  return result
}

const forgetPassword = async (email: string): Promise<string> => {
  const user = await User.findOne({ email: email })
  if (!user) {
    throw new ApiError(httpStatus.CONFLICT, 'User is not exist!!!')
  }
  const tokenInfo = {
    id: user.id,
    email: user.email,
    role: user.role,
  }
  const token = jwtHelpers.createToken(
    tokenInfo,
    config.jwt.jwt_secret as Secret,
    '5m'
  )
  const link = `http://localhost:5000/api/v1/users/reset-password/${user.id}/${token}`
  console.log(link)
  return link
}

const resetPassword = async (id: string, token: string): Promise<string> => {
  const user = await User.findById(id)
  if (!user) {
    throw new ApiError(httpStatus.CONFLICT, 'User is not exist!!!')
  }
  jwtHelpers.verifyToken(token, config.jwt.jwt_secret as Secret)
  // need to work
  return 'link'
}

const changeRole = async (id: string): Promise<IUser | null> => {
  const user = await User.findById(id)
  if (!user) {
    throw new ApiError(httpStatus.CONFLICT, 'User is not exist!!!')
  }
  const role = user.role
  let changingRole
  if (role == 'admin') {
    changingRole = 'user'
  } else changingRole = 'admin'
  const result = await User.findByIdAndUpdate(
    { _id: id },
    { role: changingRole },
    { new: true }
  )
  if (!result) {
    throw new ApiError(httpStatus.CONFLICT, 'Something went wrong!!!')
  }
  return result
}

const updateProfileByAdmin = async (
  payload: Partial<IUser>,
  id: string
): Promise<IUser | null> => {
  const isUserExist = await User.findById(id)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  if (payload.phoneNumber) {
    const checkNumber = await User.findOne({
      phoneNumber: payload.phoneNumber,
    })

    if (checkNumber) {
      throw new ApiError(httpStatus.CONFLICT, 'Already used this number!!!')
    }
  }

  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteProfileByAdmin = async (id: string): Promise<IUser | null> => {
  const isUserExist = await User.findById(id)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  const result = await User.findByIdAndDelete(id)
  return result
}

export const UserService = {
  createUser,
  loginUser,
  refreshToken,
  myProfile,
  updateProfile,
  changePassword,
  getAllUsers,
  getIndividualGroupUsers,
  getSingleUser,
  forgetPassword,
  changeRole,
  updateProfileByAdmin,
  deleteProfileByAdmin,
  resetPassword,
}
