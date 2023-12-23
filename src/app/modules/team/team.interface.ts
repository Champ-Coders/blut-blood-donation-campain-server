import { Model } from 'mongoose'

export type ITeam = {
  name: string
  designation: string
  image: string
  linkedin: string
  github: string
  facebook: string
  instagram: string
}

export type TeamModel = Model<ITeam, Record<string, unknown>>
