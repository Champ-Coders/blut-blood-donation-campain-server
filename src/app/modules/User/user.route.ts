import express from 'express'
import { UserController } from './user.controller'
import { RequestValidation } from '../../middleware/validateRequest'
import { UserValidation } from './user.validation'

const router = express.Router()

router.post(
  '/registration',
  RequestValidation(UserValidation.createUserZodSchema),
  UserController.createUserController
)

router.post(
  '/login',
  RequestValidation(UserValidation.loginUserZodSchema),
  UserController.loginController
)

router.post('/refresh-token', UserController.refreshToken)

router.get('/my-profile', UserController.myProfileController)

export const userRoutes = router
