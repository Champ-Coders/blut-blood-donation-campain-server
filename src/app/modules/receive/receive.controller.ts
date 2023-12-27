import { Request, Response, RequestHandler } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { UserInfoFromToken } from '../../../interfaces/common'
import { ReceiveService } from './receive.service'

const request: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ReceiveService.request(
      req.body,
      req.user as UserInfoFromToken
    )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Blood donate request accepted Successfully!!!',
    })
  }
)

export const ReceiveController = { request }
