import { IContact } from "./contact.interface"
import { Contact } from "./contact.model"


const insertIntoDB = async (data: IContact): Promise<IContact> => {

  

  const result = await Contact.create(data)

  return result
}

const getAllData = async (): Promise<IContact[]> => {
  const result = await Contact.find({}).populate('user')
  return result
}

const getSingleData = async (id: string): Promise<IContact | null> => {
  const result = await Contact.findOne({ _id: id })
    .populate('user')
    .populate('service')
  return result
}

const updateData = async (
  id: string,
  payload: Partial<IContact>
): Promise<IContact | null> => {
  const result = await Contact.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteData = async (id: string): Promise<IContact | null> => {
  const result = await Contact.findOneAndDelete({ _id: id })
  return result
}

export const ContactService = {
  insertIntoDB,
  getAllData,
  getSingleData,
  updateData,
  deleteData,
}
