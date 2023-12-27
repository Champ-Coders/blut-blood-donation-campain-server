import { Model, Types } from 'mongoose'
import { Group } from '../Donor/donation.constant'
import { status } from './receive.constant'

export type IBloodReceive = {
  userId: Types.ObjectId
  name: string
  bloodGroup: Group
  bag: number
  address: string
  phoneNumber: string
  status: status
  details: string
}

export type BloodReceiveModel = Model<IBloodReceive, Record<string, unknown>>
