import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { UserService } from './user.service'
import config from '../../../config'
import { UserInfoFromToken } from '../../../interfaces/common'
import pick from '../../../shared/pick'
import { userFilterableField } from './user.constant'
import { paginationFields } from '../../../constants/pagination'
// import { jwtHelpers } from '../../../helpers/jwtHelpers'
// import { Secret } from 'jsonwebtoken'
// import { userFilterableField } from './user.constant'
// import pick from '../../../shared/pick'
// import { paginationFields } from '../../../constants/pagination'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body

  const resultWithRefreshToken = await UserService.createUser(userData)
  const { refreshToken, ...result } = resultWithRefreshToken
  // set refresh token into cookies
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User is created successfully`,
    data: result,
  })
})

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const resultWithRefreshToken = await UserService.loginUser(req.body)
  const { refreshToken, ...result } = resultWithRefreshToken
  // set refresh token into cookies
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully!',
    data: result,
  })
})

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies

  const result = await UserService.refreshToken(refreshToken)

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }

  //set refresh token into cookies

  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token get successfully',
    data: result,
  })
})

const myProfile = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req?.user
  const result = await UserService.myProfile(userInfo as UserInfoFromToken)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users information retrieved successfully',
    data: result,
  })
})

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req?.user

  const result = await UserService.updateProfile(
    req.body,
    userInfo as UserInfoFromToken
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully!',
    data: result,
  })
})

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req?.user

// console.log(req.body,"...............");
  await UserService.changePassword(userInfo as UserInfoFromToken, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully!',
  })
})

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableField)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await UserService.getAllUsers(filters, paginationOptions)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All users retrieved Successfully!',
    data: result,
  })
})

const getIndividualGroupUsers = catchAsync(
  async (req: Request, res: Response) => {
    const group = req.params.group
    const letter = group.charAt(0)
    let sign = group.slice(1)
    sign == 'neg' ? (sign = '-') : (sign = '+')
    const bloodGroup = letter + sign

    const filters = pick(req.query, userFilterableField)
    const paginationOptions = pick(req.query, paginationFields)

    const result = await UserService.getIndividualGroupUsers(
      bloodGroup,
      filters,
      paginationOptions
    )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `All ${bloodGroup} users retrieved Successfully!`,
      data: result,
    })
  }
)

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await UserService.getSingleUser(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully!',
    data: result,
  })
})

export const UserController = {
  createUser,
  loginUser,
  refreshToken,
  myProfile,
  updateProfile,
  changePassword,
  getAllUsers,
  getIndividualGroupUsers,
  getSingleUser,
}
