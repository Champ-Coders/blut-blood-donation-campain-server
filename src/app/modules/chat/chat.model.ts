import { Schema, model } from 'mongoose'
import { ChatModel, IChat } from './chat.interface'

const colonySchema = new Schema<IChat, ChatModel>(
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
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Chat = model('Chat', colonySchema)
