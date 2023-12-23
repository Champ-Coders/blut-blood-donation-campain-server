import { IEvent } from './event.interface'
import { Event } from './event.model'

const insertIntoDB = async (data: IEvent): Promise<IEvent> => {
  const result = await Event.create(data)
  return result
}

const getAllData = async (): Promise<IEvent[]> => {
  const result = await Event.find({})
  return result
}

const getSingleData = async (id: string): Promise<IEvent | null> => {
  const result = await Event.findOne({ _id: id })
  return result
}

const updateData = async (
  id: string,
  payload: Partial<IEvent>
): Promise<IEvent | null> => {
  const result = await Event.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteData = async (id: string): Promise<IEvent | null> => {
  const result = await Event.findOneAndDelete({ _id: id })
  return result
}

export const EventService = {
  insertIntoDB,
  getAllData,
  getSingleData,
  updateData,
  deleteData,
}
