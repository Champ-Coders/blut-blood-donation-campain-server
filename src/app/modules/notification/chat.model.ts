import { Schema, model } from 'mongoose'
import { INotification, NotificationModel } from './chat.interface'
 

const notificationSchema = new Schema<INotification, NotificationModel>(
  {
    notificationBody: {
      type: String,
      required: true,
    },
    notificationTitle: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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

export const Chat = model('Chat', notificationSchema)
