import { Model, Types } from 'mongoose'
import { Group } from '../Donor/donation.constant'
import { Role } from './user.constant'

export type IUser = {
  id: string
  name: string
  email: string
  password: string
  phoneNumber: string
  bloodGroup: Group
  dateOfBirth: Date
  address: string
  role: Role
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
  role: Role
  id: Types.ObjectId | undefined
}

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUserExist, 'id' | 'email' | 'name' | 'password' | 'role'>>

  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
} & Model<IUser>
