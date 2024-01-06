import { Blog } from '../blog/blog.model'
import { IBlogComment } from './blogComment.interface'
import { BlogComment } from './blogComment.model'

const insertIntoDB = async (data: IBlogComment): Promise<IBlogComment> => {
  const result = await BlogComment.create(data)

  await Blog.findOneAndUpdate(
    { _id: data.blogId },
    { $push: { comments: result._id } },
    { new: true }
  )
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
  // remove comment from Blog
  await Blog.findOneAndUpdate(
    { comments: id },
    { $pull: { comments: id } },
    { new: true }
  )

  const result = await BlogComment.findOneAndDelete({ _id: id }).lean()
  return result
}

// get comments by user id
const getCommentsByUserId = async (id: string): Promise<IBlogComment[]> => {
  const result = await BlogComment.find({ userId: id })
    .populate('blogId')
    .populate('userId')
    .exec()
  return result
}

export const BlogCommentService = {
  insertIntoDB,
  getAllData,
  getSingleData,
  updateData,
  deleteData,
  getCommentsByUserId,
}
