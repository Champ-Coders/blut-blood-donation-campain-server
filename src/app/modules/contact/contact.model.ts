import { Schema, model } from 'mongoose'
import { IContact, ContactModel } from './contact.interface'

const contactSchema = new Schema<IContact, ContactModel>(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      first_name: {
        type: String,
        required: true,
      },

      last_name: {
        type: String,
        required: true,
      },
    },
    message: {
      type: String,
      required: true,
    },
    subject: {
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

export const Contact = model('Contact', contactSchema)
