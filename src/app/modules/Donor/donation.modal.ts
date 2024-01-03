import { Schema, model } from 'mongoose'
import { IDonation } from './donation.interface'
import { BloodGroups, donationStatus } from './donation.constant'

const donationSchema = new Schema<IDonation>(
  {
    hasNotification: {
      type: Boolean,
      default: false,
    },

    donnerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    patientDetails: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: BloodGroups,
      required: true,
    },

    expectedDate: {
      type: Date,
      required: true,
    },
    bag: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: donationStatus,
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
)

const Donation = model<IDonation>('Donation', donationSchema)

export default Donation
