import { Model, Types } from 'mongoose'

export type INotification = {
  notificationBody?: string
  hasNotification?: boolean
  notificationTitle?: string
  user: Types.ObjectId
}

export type NotificationModel = Model<INotification, Record<string, unknown>>
