import { Schema, model } from 'mongoose'
import { BlogCommentModel, IBlogComment } from './blogComment.interface'

const colonySchema = new Schema<IBlogComment, BlogCommentModel>(
  {
    blogId: { type: Schema.Types.ObjectId, ref: 'Blog' },
    comments: { type: String, required: true },
    replay: [
      {
        text: { type: String, required: true },
        commentId: { type: Schema.Types.ObjectId, ref: 'BlogComment' },
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const BlogComment = model('BlogComment', colonySchema)
