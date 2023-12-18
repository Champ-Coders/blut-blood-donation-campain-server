import { Model } from 'mongoose'

export type IBanner = {
  image: string
  title: string
  description: string
  link: string
}

export type BannerModel = Model<IBanner, Record<string, unknown>>
