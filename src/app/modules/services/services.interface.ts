import { Model, ObjectId } from 'mongoose'

export type IService = {
  title: string
  description: string
  image: string
  user: ObjectId
}

export type ServiceModel = Model<IService, Record<string, unknown>>
