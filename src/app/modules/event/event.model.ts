import { Schema, model } from 'mongoose'
import { EventModel, IEvent } from './event.interface'

const colonySchema = new Schema<IEvent, EventModel>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },

    event_time: {
      type: String,
      required: true,
    },
    event_date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    is_popular: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Event = model('Event', colonySchema)
