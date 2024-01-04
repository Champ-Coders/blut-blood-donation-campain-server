import { Model, ObjectId } from 'mongoose'

type Reply = {
  text: string
  userId: ObjectId
  commentId: ObjectId
}

export type IBlogComment = {
  userId: ObjectId
  comments: string
  replay?: Reply[]
  blogId: ObjectId
}

export type BlogCommentModel = Model<IBlogComment, Record<string, unknown>>
