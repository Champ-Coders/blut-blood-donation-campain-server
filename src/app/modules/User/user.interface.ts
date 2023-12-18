import { Model, Types } from 'mongoose'
import { Group } from '../Donor/donation.constant'

export type IUser = {
  name: string
  email: string
  password: string
  phoneNumber: string
  bloodGroup: Group
  totalDonation: number
  lastDonation?: Date
  totalReceived: number
  available: boolean
  notification: number
}

export type IUserExist = {
  password: string
  email: string
  name: string
  _id: Types.ObjectId | undefined
}

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUserExist, '_id' | 'email' | 'name' | 'password'>>

  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
} & Model<IUser>
