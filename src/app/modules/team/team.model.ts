import { Schema, model } from 'mongoose'
import { ITeam, TeamModel } from './team.interface'

const colonySchema = new Schema<ITeam, TeamModel>(
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

export const Team = model('Team', colonySchema)
