import { Model, Types } from 'mongoose'

export type IChat = {
  sender: Types.ObjectId
  receiver: Types.ObjectId
  message: string
  messageType: 'img' | 'text' | 'file'
  img?: string
  //   reply: string
  //   types: 'message' | 'reply'
}

export type ChatModel = Model<IChat, Record<string, unknown>>
