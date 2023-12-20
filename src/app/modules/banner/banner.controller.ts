import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IBanner } from './banner.interface'
import { BannerService } from './banner.service'

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const data = req.body
  const result = await BannerService.insertIntoDB(data)
  sendResponse<IBanner>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Banner Create Successfully!',
    data: result,
  })
})

const getAllData = catchAsync(async (req: Request, res: Response) => {
  const result = await BannerService.getAllData()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Data Retrieved Successfully!',
    data: result,
  })
})

const getSingleData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await BannerService.getSingleData(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Data Retrieved Successfully!',
    data: result,
  })
})

const updateData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const data = req.body
  const result = await BannerService.updateData(id, data)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Updated Successfully!',
    data: result,
  })
})

const deleteData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await BannerService.deleteData(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Deleted Successfully!',
    data: result,
  })
})

export const BannerController = {
  insertIntoDB,
  getAllData,
  getSingleData,
  updateData,
  deleteData,
}
