import { Model, ObjectId } from 'mongoose'

export type IReview = {
  review: string
  rating: number
  user: ObjectId
}

export type ReviewModal = Model<IReview, Record<string, unknown>>
