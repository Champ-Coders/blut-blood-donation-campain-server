import express from 'express'
import auth from '../../middleware/auth'
import { RequestValidation } from '../../middleware/validateRequest'
import { ReceiveController } from './receive.controller'
import { ReceiveValidation } from './receive.validation'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()

router
  .route('/')
  .post(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
    RequestValidation(ReceiveValidation.receiveZodSchema),
    ReceiveController.request
  )
  .get(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
    ReceiveController.getAllData
  )

export const ReceiveRoutes = router
