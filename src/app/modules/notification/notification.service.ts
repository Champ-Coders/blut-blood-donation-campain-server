import { INotification } from './notification.interface'
import { Notification } from './notification.model'

const getAllData = async (): Promise<INotification[]> => {
  const result = await Notification.find({})
    .populate({
      path: 'user',
    })
    .sort({ createdAt: -1 })
  return result
}

const createData = async (data: INotification): Promise<INotification> => {
  const result = await Notification.create(data)
  return result
}

const updateData = async (userId: string): Promise<INotification[] | any> => {
  const result = await Notification.updateMany(
    { user: userId },
    { $set: { hasNotification: false } }
  )
  return result
}

export const NotificationService = {
  getAllData,
  createData,
  updateData,
}
