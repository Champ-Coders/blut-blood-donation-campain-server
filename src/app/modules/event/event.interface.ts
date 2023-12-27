import { Model } from 'mongoose'

export type IEvent = {
  title: string
  description: string
  banner: string
  image: string
  event_time: string
  event_date: Date
  location: string;
  is_popular?:true | false
}

export type EventModel = Model<IEvent, Record<string, unknown>>
