import { IReview } from './review.interface'
import { Review } from './review.model'

const insertIntoDB = async (data: IReview): Promise<IReview> => {
  const result = await Review.create(data)
  return result
}

const getAllData = async (): Promise<IReview[]> => {
  const result = await Review.find({})
  return result
}

const getSingleData = async (id: string): Promise<IReview | null> => {
  const result = await Review.findOne({ _id: id })
  return result
}

const updateData = async (
  id: string,
  payload: Partial<IReview>
): Promise<IReview | null> => {
  const result = await Review.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteData = async (id: string): Promise<IReview | null> => {
  const result = await Review.findOneAndDelete({ _id: id })
  return result
}

export const ReviewService = {
  insertIntoDB,
  getAllData,
  getSingleData,
  updateData,
  deleteData,
}
