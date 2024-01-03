import { Model} from 'mongoose'

export type IChat = {
  senderEmail: string
  receiverEmail: string
  message: string
  messageType: 'img' | 'text' | 'file'
  img?: string
  is_deleted?: true
  //   reply: string
  //   types: 'message' | 'reply'
}

export type ChatModel = Model<IChat, Record<string, unknown>>
