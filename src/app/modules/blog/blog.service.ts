import { IBlog } from './blog.interface'
import { Blog } from './blog.model'

const insertIntoDB = async (data: IBlog): Promise<IBlog> => {
  const result = await Blog.create(data)
  return result
}

const getAllData = async (): Promise<IBlog[]> => {
  const result = await Blog.find({})
    .populate({
      path: 'user',
      select: ['_id', 'name', 'email', 'imgUrl'],
    })
    .populate({
      path: 'comments',
      populate: {
        path: 'userId',
        select: ['_id', 'name', 'email', 'imgUrl'],
      },
      // remove blogId from comments
      select: ['_id', 'comment', 'userId', 'createdAt', 'updatedAt', 'replay'],
    })
  return result
}

const getSingleData = async (id: string): Promise<IBlog | null> => {
  const result = await Blog.findOne({ _id: id })
    .populate({
      path: 'user',
      select: ['_id', 'name', 'email', 'imgUrl'],
    })
    .populate({
      path: 'comments',
      populate: {
        path: 'userId',
        select: ['_id', 'name', 'email', 'imgUrl'],
      },
      // remove blogId from comments
      select: ['_id', 'comment', 'userId', 'createdAt', 'updatedAt', 'replay'],
    })
  return result
}

const updateData = async (
  id: string,
  payload: Partial<IBlog>
): Promise<IBlog | null> => {
  const result = await Blog.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteData = async (id: string): Promise<IBlog | null> => {
  const result = await Blog.findOneAndDelete({ _id: id })
  return result
}

export const BlogService = {
  insertIntoDB,
  getAllData,
  getSingleData,
  updateData,
  deleteData,
}
