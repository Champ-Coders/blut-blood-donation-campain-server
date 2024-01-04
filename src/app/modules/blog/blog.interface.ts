import { Model, ObjectId } from 'mongoose'

export type IBlog = {
  title: string
  description: string
  image: string
  logo?: string
  user: ObjectId
  comments?: ObjectId[]
}

export type BlogModel = Model<IBlog, Record<string, unknown>>
