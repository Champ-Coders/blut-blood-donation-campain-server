import { IService } from './services.interface'
import { Service } from './services.model'

const insertIntoDB = async (data: IService): Promise<IService> => {
  const result = await Service.create(data)
  return result
}

const getAllData = async (): Promise<IService[]> => {
  const result = await Service.find({})
  return result
}

const getSingleData = async (id: string): Promise<IService | null> => {
  const result = await Service.findOne({ _id: id })
  return result
}

const updateData = async (
  id: string,
  payload: Partial<IService>
): Promise<IService | null> => {
  const result = await Service.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteData = async (id: string): Promise<IService | null> => {
  const result = await Service.findOneAndDelete({ _id: id }).lean()
  return result
}

export const ServicesService = {
  insertIntoDB,
  getAllData,
  getSingleData,
  updateData,
  deleteData,
}
