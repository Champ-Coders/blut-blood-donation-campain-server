import { Schema, model } from 'mongoose'
import { ChatModel, IChat } from './chat.interface'

const chatSchema = new Schema<IChat, ChatModel>(
  {
    message: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    messageType: {
      type: String,
      default: 'text',
      required: true,
    },
    senderEmail: {
      type: String,
      required: true,
    },
    receiverEmail: {
      type: String,
      required: true,
    },
    types: {
      type: String,
      default: 'comment',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Chat = model('Chat', chatSchema)
