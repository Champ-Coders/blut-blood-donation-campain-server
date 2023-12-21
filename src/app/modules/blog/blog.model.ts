import { Schema, model } from 'mongoose'
import { BlogModel, IBlog } from './blog.interface'

const colonySchema = new Schema<IBlog, BlogModel>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: { type: String, required: true },
    logo: { type: String, required: false },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Blog = model('Blog', colonySchema)
