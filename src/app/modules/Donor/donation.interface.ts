import { Model, Types } from 'mongoose'
import { Group, status } from './donation.constant'

export type IDonation = {
  hasNotification: boolean
  donnerId: Types.ObjectId
  userId: Types.ObjectId
  patientDetails: string
  expectedDate: Date
  bag: number
  bloodGroup: Group
  status: status
}

export type DonationModel = Model<IDonation, Record<string, unknown>>

export type IDonationFilters = {
  searchTerm?: string
  status?: string
  bloodGroup?: string
}
