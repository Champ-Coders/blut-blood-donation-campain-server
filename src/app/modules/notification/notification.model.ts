import { Schema, model } from 'mongoose'
import { INotification, NotificationModel } from './notification.interface'

const notificationSchema = new Schema<INotification, NotificationModel>(
  {
    notificationBody: {
      type: String,
      optional: true,
    },
    notificationTitle: {
      type: String,
      optional: true,
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

export const Notification = model('Notification', notificationSchema)
