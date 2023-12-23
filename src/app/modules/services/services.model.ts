import { Schema, model } from 'mongoose'
import { IService, ServiceModel } from './services.interface'

const colonySchema = new Schema<IService, ServiceModel>(
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

export const Service = model('Service', colonySchema)
