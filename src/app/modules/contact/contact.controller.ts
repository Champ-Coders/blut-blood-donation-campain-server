import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ContactService } from './contact.service'
import { IContact } from './contact.interface'


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const data = req.body
  const result = await ContactService.insertIntoDB(data)
  console.log("🚀 ~ file: contact.controller.ts:12 ~ insertIntoDB ~ result:", result)


  sendResponse<IContact>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Contact Sent Successfully!',
    data: result,
  })
})

const getAllData = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactService.getAllData()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Data Retrieved Successfully!',
    data: result,
  })
})

const getSingleData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ContactService.getSingleData(id)
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
  const result = await ContactService.updateData(id, data)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Updated Successfully!',
    data: result,
  })
})

const deleteData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ContactService.deleteData(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Deleted Successfully!',
    data: result,
  })
})

export const ContactController = {
  insertIntoDB,
  getAllData,
  getSingleData,
  updateData,
  deleteData,
}
