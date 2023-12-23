import { IVolunteers } from './volunteers.interface'
import { Volunteers } from './volunteers.model'

const insertIntoDB = async (data: IVolunteers): Promise<IVolunteers> => {
  const result = await Volunteers.create(data)
  return result
}

const getAllData = async (): Promise<IVolunteers[]> => {
  const result = await Volunteers.find({})
  return result
}

const getSingleData = async (id: string): Promise<IVolunteers | null> => {
  const result = await Volunteers.findOne({ _id: id })
  return result
}

const updateData = async (
  id: string,
  payload: Partial<IVolunteers>
): Promise<IVolunteers | null> => {
  const result = await Volunteers.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteData = async (id: string): Promise<IVolunteers | null> => {
  const result = await Volunteers.findOneAndDelete({ _id: id })
  return result
}

export const VolunteersService = {
  insertIntoDB,
  getAllData,
  getSingleData,
  updateData,
  deleteData,
}
