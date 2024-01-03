import { IBlogComment } from './blogComment.interface'
import { BlogComment } from './blogComment.model'

const insertIntoDB = async (data: IBlogComment): Promise<IBlogComment> => {
  const result = await BlogComment.create(data)

  return result
}

const getAllData = async (): Promise<IBlogComment[]> => {
  const result = await BlogComment.find({})
    .populate('blogId')
    .populate({
      path: 'userId',
      model: 'User',
    })
    .populate({
      path: 'replay.userId',
      model: 'User',
    })
    .exec()
  return result
}

const getSingleData = async (id: string): Promise<IBlogComment | null> => {
  const result = await BlogComment.findOne({ _id: id })
    .populate('blogId')
    .populate('userId')
    .exec()
  return result
}

const updateData = async (
  id: string,
  payload: Partial<IBlogComment>
): Promise<IBlogComment | null> => {
  const result = await BlogComment.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteData = async (id: string): Promise<IBlogComment | null> => {
  const result = await BlogComment.findOneAndDelete({ _id: id })
  return result
}

export const BlogCommentService = {
  insertIntoDB,
  getAllData,
  getSingleData,
  updateData,
  deleteData,
}
