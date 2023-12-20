import { Model, Types } from 'mongoose'
import { Group, status } from './donation.constant'

export type IDonation = {
  donnerId: Types.ObjectId
  userId: Types.ObjectId
  patientDetails: string
  bloodGroup: Group
  status: status
}

export type DonationModel = Model<IDonation, Record<string, unknown>>

export type IDonationFilters = {
  searchTerm?: string
  status?: string
  bloodGroup?: string
}
