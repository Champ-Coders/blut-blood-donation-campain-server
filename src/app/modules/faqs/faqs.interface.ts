import { Model, ObjectId } from 'mongoose'

export type IFaqs = {
  title: string
  description: string
  user: ObjectId
}

export type FaqsModel = Model<IFaqs, Record<string, unknown>>
