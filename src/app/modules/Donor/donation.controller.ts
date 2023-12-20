import { Request, Response, RequestHandler } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { DonationService } from './donation.service'
import { UserInfoFromToken } from '../../../interfaces/common'
import { paginationFields } from '../../../constants/pagination'
import { donationFilterableField } from './donation.constant'

const bloodRequest: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DonationService.bloodRequest(
      req.body,
      req.user as UserInfoFromToken
    )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Request Create Successfully!!!',
    })
  }
)

const getAllDonationInfo = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, donationFilterableField)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await DonationService.getAllDonationInfo(
    filters,
    paginationOptions
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Donation info retrieved Successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleDonationInfo = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id

    const result = await DonationService.getSingleDonationInfo(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Donation info retrieved Successfully',
      data: result,
    })
  }
)

const acceptRequest = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await DonationService.acceptRequest(
    id,
    req.user as UserInfoFromToken
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donation Request Accepted Successfully.',
    data: result,
  })
})

const cancelRequest = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await DonationService.cancelRequest(
    id,
    req.user as UserInfoFromToken
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donation Request Canceled Successfully.',
    data: result,
  })
})

export const DonationController = {
  getAllDonationInfo,
  getSingleDonationInfo,
  bloodRequest,
  cancelRequest,
  acceptRequest,
}
