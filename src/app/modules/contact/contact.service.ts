/* eslint-disable @typescript-eslint/no-explicit-any */

import { IContact } from './contact.interface'
import { Contact } from './contact.model'
import { sendMailer } from './sendMail'

const insertIntoDB = async (data: IContact): Promise<IContact | any> => {
  console.log('🚀 ~ file: contact.service.ts:6 ~ insertIntoDB ~ data:', data)

  const contactHTML = `
  <!DOCTYPE html>
  <html lang="en">
 <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Message Confirmation</title>
 </head>
 <body style="font-family: 'Arial', sans-serif;">
  <p>Hello I am  ${data?.name?.first_name} ${data?.name?.last_name},</p>
  <p>My message from Blood donation website</p>
  <p><strong>${data?.message}</p>
  <p>Thank you </p>
 </body>
 </html>

  `
  const sendMail = await sendMailer(data?.subject, data?.email, contactHTML)
  // console.log(
  //   '🚀 ~ file: contact.service.ts:24 ~ insertIntoDB ~ sendMail:',
  //   sendMail
  // )
  if (sendMail?.accepted) {
    const result = await Contact.create(data)
    return result
  }
}

const getAllData = async (): Promise<IContact[]> => {
  const result = await Contact.find({})
  return result
}

const getSingleData = async (id: string): Promise<IContact | null> => {
  const result = await Contact.findOne({ _id: id })

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
  const result = await Contact.findOneAndDelete({ _id: id }).lean()
  return result
}


export const ContactService = {
  insertIntoDB,
  getAllData,
  getSingleData,
  updateData,
  deleteData,
}
