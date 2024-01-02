import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IChat } from './chat.interface'
import httpStatus from 'http-status'

const createMessage = catchAsync(async (req: Request, res: Response) => {
  const data = req.body
  console.log('🚀 ~ file: chat.controller.ts:9 ~ createMessage ~ data:', data)

  // const result = await EventService.insertIntoDB(data)
  sendResponse<IChat>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'message Create Successfully!',
    //   data: result,
  })
})

const getAllMessagedUser = catchAsync(async (req: Request, res: Response) => {
  //   const result = await EventService.getAllData()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Data Retrieved Successfully!',
    // data: result,
  })
})

const getSingleUserMessage = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  console.log(
    '🚀 ~ file: chat.controller.ts:32 ~ getSingleUserMessage ~ id:',
    id
  )

  //   const result = await EventService.getSingleData(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Data Retrieved Successfully!',
    // data: result,
  })
})

export const chatController = {
  createMessage,
  getAllMessagedUser,
  getSingleUserMessage,
}
