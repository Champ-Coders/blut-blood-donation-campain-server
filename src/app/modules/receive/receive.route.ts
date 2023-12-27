import express from 'express'
import auth from '../../middleware/auth'
import { RequestValidation } from '../../middleware/validateRequest'
import { ReceiveController } from './receive.controller'
import { ReceiveValidation } from './receive.validation'

const router = express.Router()

router.post(
  '/',
  auth(),
  RequestValidation(ReceiveValidation.receiveZodSchema),
  ReceiveController.request
)

export const ReceiveRoutes = router
