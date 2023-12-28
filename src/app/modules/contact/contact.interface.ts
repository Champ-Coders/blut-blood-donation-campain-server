import { Model, ObjectId } from 'mongoose'

type IName = {
  first_name: string
  last_name: string
}

export type IContact = {
  email: string
  name: IName
  user: ObjectId
  message: string
  subject: string
}

export type ContactModel = Model<IContact, Record<string, unknown>>
