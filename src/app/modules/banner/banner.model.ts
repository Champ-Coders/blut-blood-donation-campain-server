import { Schema, model } from 'mongoose'
import { BannerModel, IBanner } from './banner.interface'

const colonySchema = new Schema<IBanner, BannerModel>(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Banner = model('Banner', colonySchema)
