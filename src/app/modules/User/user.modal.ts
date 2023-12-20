import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../../config'
import { BloodGroups } from '../Donor/donation.constant'
import { userRoles } from './user.constant'

export const userSchema = new Schema<IUser, UserModel>({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: userRoles,
    default: 'user',
  },
  bloodGroup: {
    type: String,
    enum: BloodGroups,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  totalDonation: {
    type: Number,
    required: true,
    default: 0,
  },
  lastDonation: {
    type: Date,
  },
  totalReceived: {
    type: Number,
    required: true,
    default: 0,
  },
  available: {
    type: Boolean,
    default: true,
  },
  notification: {
    type: Number,
    required: true,
    default: 0,
    select: false,
  },
})

userSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IUser, 'id' | 'email' | 'password' | 'role'> | null> {
  return await User.findOne(
    { email },
    { phoneNumber: 1, email: 1, password: 1, role: 1 }
  )
}

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savePassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savePassword)
}

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  )
  next()
})

export const User = model<IUser, UserModel>('User', userSchema)
