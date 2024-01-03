import { UserInfoFromToken } from '../../../interfaces/common'
import httpStatus from 'http-status'
import { User } from '../User/user.modal'
import ApiError from '../../../errors/ApiErrors'
import { IBloodReceive } from './receive.interface'
import BloodReceive from './receive.modal'

const request = async (
  payload: Partial<IBloodReceive>,
  userInfo: UserInfoFromToken
): Promise<IBloodReceive | null> => {
  const user = await User.findById(userInfo?.id)

  if (!user) {
    throw new ApiError(httpStatus.CONFLICT, 'Your profile does not exist!!!')
  }
  payload.userId = userInfo.id
  const result = await BloodReceive.create(payload)
  return result
}

const getAllDataDB = async (userInfo: any): Promise<IBloodReceive[]> => {
  console.log(
    '🚀 ~ file: receive.service.ts:23 ~ getAllDataDB ~ userInfo:',
    userInfo
  )

  const result = await BloodReceive.find({ userId: userInfo.id })
  return result
}

export const ReceiveService = {
  request,
  getAllDataDB,
}
