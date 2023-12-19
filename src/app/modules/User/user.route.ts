import express from 'express'
import { UserController } from './user.controller'
import { RequestValidation } from '../../middleware/validateRequest'
import { UserValidation } from './user.validation'
import auth from '../../middleware/auth'

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
  auth(),
  RequestValidation(UserValidation.updateUserZodSchema),
  UserController.updateProfile
)

router.patch(
  '/change-password',
  auth(),
  RequestValidation(UserValidation.changePasswordZodSchema),
  UserController.changePassword
)

router.post(
  '/refresh-token',
  RequestValidation(UserValidation.refreshTokenZodSchema),
  UserController.refreshToken
)

// router.get('/all-user', UserController.getAllUsers)

// router.get('/all-individual-group/:group', UserController.getIndividualGroupUsers)

// router.get('/single-user/:id', UserController.getSingleUser)

export const userRoutes = router
