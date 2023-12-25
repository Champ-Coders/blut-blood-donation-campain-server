import express from 'express'
import { UserController } from './user.controller'
import { RequestValidation } from '../../middleware/validateRequest'
import { UserValidation } from './user.validation'
import auth from '../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()

router.post(
  '/registration',
  RequestValidation(UserValidation.createUserZodSchema),
  UserController.createUser
)

router.post(
  '/login',
  RequestValidation(UserValidation.loginUserZodSchema),
  UserController.loginUser
)

router.get('/profile', auth(), UserController.myProfile)

router.patch(
  '/profile',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  RequestValidation(UserValidation.updateUserZodSchema),
  UserController.updateProfile
)

router.patch(
  '/change-password',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  RequestValidation(UserValidation.changePasswordZodSchema),
  UserController.changePassword
)

router.post(
  '/refresh-token',
  RequestValidation(UserValidation.refreshTokenZodSchema),
  UserController.refreshToken
)

router.get('/all-users', UserController.getAllUsers)

router.get(
  '/all-individual-group/:group',
  UserController.getIndividualGroupUsers
)

router.get('/single-user/:id', UserController.getSingleUser)

router.post('/forget-password', UserController.forgetPassword)

router.post('/reset-password/:id/:token', UserController.resetPassword)

router.patch(
  '/profile/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  RequestValidation(UserValidation.updateUserZodSchema),
  UserController.updateProfileByAdmin
)

router.patch(
  '/change-role/:id',
  // RequestValidation(UserValidation.changeRoleZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.changeRole
)

router.delete(
  '/profile/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.deleteProfileByAdmin
)

export const userRoutes = router
