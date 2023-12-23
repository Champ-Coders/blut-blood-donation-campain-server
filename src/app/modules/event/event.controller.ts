import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IEvent } from './event.interface'
import { EventService } from './event.service'


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const data = req.body
  const result = await EventService.insertIntoDB(data)
  sendResponse<IEvent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event Create Successfully!',
    data: result,
  })
})

const getAllData = catchAsync(async (req: Request, res: Response) => {
  const result = await EventService.getAllData()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Data Retrieved Successfully!',
    data: result,
  })
})

const getSingleData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await EventService.getSingleData(id)
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
  const result = await EventService.updateData(id, data)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Updated Successfully!',
    data: result,
  })
})

const deleteData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await EventService.deleteData(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data Deleted Successfully!',
    data: result,
  })
})

export const EventController = {
  insertIntoDB,
  getAllData,
  getSingleData,
  updateData,
  deleteData,
}
