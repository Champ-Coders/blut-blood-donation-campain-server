import { Schema, model } from 'mongoose'
import { IVolunteers, VolunteersModel } from './volunteers.interface'

const colonySchema = new Schema<IVolunteers, VolunteersModel>(
  {
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
      required: true,
    },
    facebook: {
      type: String,
      required: true,
    },
    github: {
      type: String,
      required: true,
    },
    instagram: {
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

export const Volunteers = model('Volunteers', colonySchema)
