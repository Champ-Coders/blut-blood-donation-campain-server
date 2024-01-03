import { Schema, model } from 'mongoose'
import { IBloodReceive } from './receive.interface'
import { BloodGroups } from '../Donor/donation.constant'
import { receiveStatus } from './receive.constant'

const bloodReceiveSchema = new Schema<IBloodReceive>(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: BloodGroups,
      required: true,
    },
    bag: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: receiveStatus,
      default: 'request',
    },
  },
  {
    timestamps: true,
  }
)

const BloodReceive = model<IBloodReceive>('BloodReceive', bloodReceiveSchema)

export default BloodReceive
