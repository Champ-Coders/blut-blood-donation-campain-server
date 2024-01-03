import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { INotification } from './notification.interface'
import { NotificationService } from './notification.service'

const getAllData = catchAsync(async (req: Request, res: Response) => {
  const result = await NotificationService.getAllData()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Notification Successfully!',
    data: result,
  })
})

const createData = catchAsync(async (req: Request, res: Response) => {
  const data = req.body
  const result = await NotificationService.createData(data)
  sendResponse<INotification>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification Create Successfully!',
    data: result,
  })
})

export const NotificationController = {
  getAllData,
  createData,
}
