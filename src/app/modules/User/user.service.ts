import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiErrors'
import {
  IChangePassword,
  ILoginUser,
  IRefreshTokenResponse,
} from './user.constant'
import { ILoginUserResponse, IUser } from './user.interface'
import { User } from './user.modal'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import { UserInfoFromToken } from '../../../interfaces/common'

const createUser = async (
  user: IUser
): Promise<{
  userInfo: IUser
  accessToken: string
  refreshToken: string
}> => {
  const checkNumber = await User.findOne({ phoneNumber: user.phoneNumber })
  const checkEmail = await User.findOne({ email: user.email })

  if (checkEmail) {
    throw new ApiError(httpStatus.CONFLICT, 'Already used this email!!!')
  }
  if (checkNumber) {
    throw new ApiError(httpStatus.CONFLICT, 'Already used this phone number!!!')
  }
  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user!')
  }
  const result = await User.findById(createdUser._id)
  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'INTERNAL_SERVER_ERROR, Please try again later!!!'
    )
  }
  const tokenInfo = {
    id: createdUser.id,
    email: user.email,
    role: 'user',
  }

  const accessToken = jwtHelpers.createToken(
    tokenInfo,
    config.jwt.jwt_secret as Secret,
    config.jwt.access_token_expires_in as string
  )

  const refreshToken = jwtHelpers.createToken(
    tokenInfo,
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  )

  return { userInfo: result, accessToken, refreshToken }
}

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload

  const isUserExist = await User.isUserExist(email)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist.")
  }

  if (!(await User.isPasswordMatched(password, isUserExist.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect.')
  }

  const { role, id } = isUserExist
  const accessToken = jwtHelpers.createToken(
    { id, email, role },
    config.jwt.jwt_secret as Secret,
    config.jwt.access_token_expires_in as string
  )
  const refreshToken = jwtHelpers.createToken(
    { id, email, role },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  )
  return {
    accessToken,
    refreshToken,
  }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token_secret as Secret
    )
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
  }

  const { email } = verifiedToken

  const isUserExist = await User.isUserExist(email)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  //generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      email: isUserExist.email,
      role: isUserExist.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.access_token_expires_in as string
  )

  return {
    accessToken: newAccessToken,
  }
}

const myProfile = async (
  userInfo: UserInfoFromToken
): Promise<IUser | null> => {
  const result = await User.findById(userInfo.id).select('+notification')
  if (!result) {
    throw new ApiError(httpStatus.CONFLICT, 'Your profile is not exist!!!')
  }
  return result
}

const updateProfile = async (
  payload: Partial<IUser>,
  userInfo: UserInfoFromToken
): Promise<IUser | null> => {
  const isUserExist = await User.findById(userInfo.id)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  if (payload.phoneNumber) {
    const checkNumber = await User.findOne({
      phoneNumber: payload.phoneNumber,
    })

    if (checkNumber) {
      throw new ApiError(httpStatus.CONFLICT, 'Already used this number!!!')
    }
  }

  const result = await User.findOneAndUpdate({ _id: userInfo.id }, payload, {
    new: true,
  })
  return result
}

const changePassword = async (
  userInfo: UserInfoFromToken,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload

  const isUserExist = await User.findById(userInfo.id).select({
    password: true,
  })

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  if (!(await User.isPasswordMatched(oldPassword, isUserExist.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect')
  }
  isUserExist.password = newPassword
  isUserExist.save()
}

export const UserService = {
  createUser,
  loginUser,
  refreshToken,
  myProfile,
  updateProfile,
  changePassword,
}
