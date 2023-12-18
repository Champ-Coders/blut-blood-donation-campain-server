import { Schema, model } from 'mongoose'
import { IUser, IUserExist, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../../config'
import { BloodGroups } from '../Donor/donation.constant'

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
    select: 0,
  },
  bloodGroup: {
    type: String,
    enum: BloodGroups,
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
  },
})

userSchema.statics.isUserExist = async function (
  email: string
): Promise<
  Partial<Pick<IUserExist, '_id' | 'password' | 'name' | 'email'> | null>
> {
  const user = await User.findOne({ email }, { email: 1, name: 1, password: 1 })

  console.log('from login', user)
  return user
}

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const isMatched = await bcrypt.compare(givenPassword, savedPassword)
  console.log('pasword.....', isMatched)

  return isMatched
}

userSchema.pre('save', async function (next) {
  ///hasing User Password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  )
  next()
})

export const User = model<IUser, UserModel>('User', userSchema)
