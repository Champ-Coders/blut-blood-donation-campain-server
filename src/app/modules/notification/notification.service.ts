import { INotification } from './notification.interface'
import { Notification } from './notification.model'

const getAllData = async (): Promise<INotification[]> => {
  const result = await Notification.find({})
  return result
}

const createData = async (data: INotification): Promise<INotification> => {
  const result = await Notification.create(data)
  return result
}

export const NotificationService = {
  getAllData,
  createData,
}
