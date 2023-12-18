import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IBlog } from './blog.interface'
import { BlogService } from './blog.service'

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const data = req.body
  const result = await BlogService.insertIntoDB(data)
  sendResponse<IBlog>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog Create Successfully!',
    data: result,
  })
})

const getAllData = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getAllData()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Data Retrieved Successfully!',
    data: result,
  })
})

const getSingleData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await BlogService.getSingleData(id)
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
  const result = await BlogService.updateData(id, data)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Updated Successfully!',
    data: result,
  })
})

const deleteData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await BlogService.deleteData(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Deleted Successfully!',
    data: result,
  })
})

export const BlogController = {
  insertIntoDB,
  getAllData,
  getSingleData,
  updateData,
  deleteData,
}
