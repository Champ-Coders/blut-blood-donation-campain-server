import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IService } from './services.interface'
import { ServicesService } from './services.service'

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const data = req.body
  const result = await ServicesService.insertIntoDB(data)
  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services Create Successfully!',
    data: result,
  })
})

const getAllData = catchAsync(async (req: Request, res: Response) => {
  const result = await ServicesService.getAllData()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Data Retrieved Successfully!',
    data: result,
  })
})

const getSingleData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ServicesService.getSingleData(id)
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
  const result = await ServicesService.updateData(id, data)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Updated Successfully!',
    data: result,
  })
})

const deleteData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ServicesService.deleteData(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Deleted Successfully!',
    data: result,
  })
})

export const ServicesController = {
  insertIntoDB,
  getAllData,
  getSingleData,
  updateData,
  deleteData,
}
