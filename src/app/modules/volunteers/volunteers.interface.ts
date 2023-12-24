import { Model } from 'mongoose'

export type IVolunteers = {
  name: string
  designation: string
  image: string
  linkedin: string
  github: string
  facebook: string
  instagram: string
}

export type VolunteersModel = Model<IVolunteers, Record<string, unknown>>
