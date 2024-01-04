import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IChat } from './chat.interface'
import httpStatus from 'http-status'
import { chatService } from './chat.service'

const refreshMessage = catchAsync(async (req: Request, res: Response) => {
  const data = req.body
  console.log('🚀 ~ file: chat.controller.ts:9 ~ createMessage ~ data:', data)

  const result = data
  sendResponse<IChat>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'message Create Successfully!',
    data: result,
  })
})


const getAllMessagedUser = catchAsync(async (req: Request, res: Response) => {
  const result = await chatService.getAllMessagedUser()
  // console.log('chat user', result)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All user Retrieved Successfully!',
    data: result,
  })
})

const getSingleUserMessage = catchAsync(async (req: Request, res: Response) => {
  const senderEmail = req.params.email
  // console.log(
  //   '🚀 ~ file: chat.controller.ts:34 ~ getSingleUserMessage ~ senderEmail:',
  //   senderEmail
  // )

  const result = await chatService.getSIngleUserMessage(
    senderEmail,
    'admin@admin.com'
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All User Message Retrieved Successfully!',
    data: result,
  })
})
const getAdminMessage = catchAsync(async (req: Request, res: Response) => {
  const senderId = req.params.sender

  const result = await chatService.getAdminMessage(senderId, 'admin@admin.com')
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Admin Message Retrieved Successfully!',
    data: result,
  })
})

export const chatController = {
  refreshMessage,
  getAllMessagedUser,
  getSingleUserMessage,
  getAdminMessage,
}
