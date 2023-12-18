import { Schema, model } from 'mongoose'
import { FaqsModel, IFaqs } from './faqs.interface'

const colonySchema = new Schema<IFaqs, FaqsModel>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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

export const Faqs = model('Faqs', colonySchema)
