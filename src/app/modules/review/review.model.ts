import { Schema, model } from 'mongoose'
import { IReview, ReviewModal } from './review.interface'

const colonySchema = new Schema<IReview, ReviewModal>(
  {
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
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

export const Review = model('Review', colonySchema)
