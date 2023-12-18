import { Faqs } from './faqs.model'
import { IFaqs } from './faqs.interface'

const insertIntoDB = async (data: IFaqs): Promise<IFaqs> => {
  const result = await Faqs.create(data)
  return result
}

const getAllData = async (): Promise<IFaqs[]> => {
  const result = await Faqs.find({})
  return result
}

const getSingleData = async (id: string): Promise<IFaqs | null> => {
  const result = await Faqs.findOne({ _id: id })
  return result
}

const updateData = async (
  id: string,
  payload: Partial<IFaqs>
): Promise<IFaqs | null> => {
  const result = await Faqs.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteData = async (id: string): Promise<IFaqs | null> => {
  const result = await Faqs.findOneAndDelete({ _id: id })
  return result
}

export const FaqsService = {
  insertIntoDB,
  getAllData,
  getSingleData,
  updateData,
  deleteData,
}
