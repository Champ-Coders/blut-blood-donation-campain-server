import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiErrors'
import { User } from '../User/user.modal'
import { Chat } from './chat.model'
import { ENUM_USER_ROLE } from '../../../enums/user'
// import { UserService } from '../User/user.service'

const createmessage = async (payload: any) => {
  // console.log('🚀 ~ file: chat.service.ts:2 ~ payload:', payload)

  const checkEmail = await User.findOne({ email: payload.email })

  // console.log(
  //   '🚀 ~ file: chat.service.ts:8 ~ constchat_message= ~ checkEmail:',
  //   checkEmail
  // )

  if (!checkEmail) {
    throw new ApiError(httpStatus.CONFLICT, 'Could not find the user!!!')
  } else {
    payload.role = checkEmail.role
  }

  const updateUserIsChat = await User.findOneAndUpdate(
    { _id: checkEmail?._id },
    {
      isChat: true,
      chatTime: Date.now(),
    },
    {
      new: true,
    }
  )

  if (payload?.type === 'reply') {
    const isUserById = await User.findById(payload?._id)

    const createMessage = await Chat.create({
      message: payload?.message,
      img:
        payload?.img,
      senderEmail: isUserById?.email,
      receiverEmail: 'admin@admin.com',
      types: 'reply',
    })
    console.log(
      '🚀 ~ file: chat.service.ts:45 ~ constchat_message= ~ createMessage:',
      createMessage
    )

    return createMessage
  }

  const createMessageData = {
    message: payload?.message,
    img: payload?.img,
    senderEmail: updateUserIsChat?.email,
    receiverEmail: 'admin@admin.com',
  }
  console.log(
    '🚀 ~ file: chat.service.ts:37 ~ createmessage ~ createMessageData:',
    createMessageData
  )

  const createMessage = await Chat.create(createMessageData)

  return createMessage
}

const createreply = async (payload: any) => {
  console.log('🚀 ~ file: chat.service.ts:53 ~ createreply ~ payload:', payload)

  const checkEmail = await User.findOne({ email: payload.email })
  console.log(
    '🚀 ~ file: chat.service.ts:8 ~ constchat_message= ~ checkEmail:',
    checkEmail
  )

  if (!checkEmail) {
    throw new ApiError(httpStatus.CONFLICT, 'Could not find the user!!!')
  } else {
    payload.role = checkEmail.role
  }

  const updateUserIsChat = await User.findOneAndUpdate(
    { _id: checkEmail?._id },
    {
      isChat: true,
      chatTime: Date.now(),
    },
    {
      new: true,
    }
  )
  const createMessageData = {
    message: payload?.message,
    img: payload?.img,
    senderEmail: 'admin@admin.com',
    receiverEmail: updateUserIsChat?.email,
  }
  console.log(
    '🚀 ~ file: chat.service.ts:37 ~ createmessage ~ createMessageData:',
    createMessageData
  )

  const createMessage = await Chat.create(createMessageData)
  console.log(
    '🚀 ~ file: chat.service.ts:45 ~ constchat_message= ~ createMessage:',
    createMessage
  )

  return createMessage
}

const getAllMessagedUser = async () => {
  const allUser = await User.find({
    isChat: true,
    role: ENUM_USER_ROLE.USER,
  }).sort({ chatTime: 'desc' })

  return allUser
}

const getSIngleUserMessage = async (
  senderEmail: string,
  receiverEmail: string
) => {
  const getAllMessage = await Chat.find({
    $or: [
      { senderEmail: senderEmail, receiverEmail },
      { senderEmail: senderEmail, receiverEmail: receiverEmail },
    ],
  })

  return getAllMessage
}

const getAdminMessage = async (senderId: string, receiverEmail: string) => {
  // console.log(senderId, receiverEmail)

  const senderData = await User.findById(senderId)
  // console.log('🚀 ~ file: chat.service.ts:65 ~ senderData:', senderData)

  const getAllMessage = await Chat.find({
    $or: [
      { senderEmail: senderData?.email, receiverEmail },
      { senderEmail: senderData?.email, receiverEmail: receiverEmail },
    ],
  })
  // .sort({ updatedAt: 'desc' })
  // console.log("🚀 ~ file: chat.service.ts:161 ~ getAdminMessage ~ getAllMessage:", getAllMessage)

  return getAllMessage
}

export const chatService = {
  createmessage,
  getSIngleUserMessage,
  getAllMessagedUser,
  getAdminMessage,
  createreply,
}
