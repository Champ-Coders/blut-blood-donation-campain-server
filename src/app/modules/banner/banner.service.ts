import { IBanner } from './banner.interface'
import { Banner } from './banner.model'

const insertIntoDB = async (data: IBanner): Promise<IBanner> => {
  const result = await Banner.create(data)
  return result
}

const getAllData = async (): Promise<IBanner[]> => {
  const result = await Banner.find({})
  return result
}

const getSingleData = async (id: string): Promise<IBanner | null> => {
  const result = await Banner.findOne({ _id: id })
  return result
}

const updateData = async (
  id: string,
  payload: Partial<IBanner>
): Promise<IBanner | null> => {
  const result = await Banner.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteData = async (id: string): Promise<IBanner | null> => {
  const result = await Banner.findOneAndDelete({ _id: id })
  return result
}

export const BannerService = {
  insertIntoDB,
  getAllData,
  getSingleData,
  updateData,
  deleteData,
}
