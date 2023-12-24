import express from 'express'
import { EventController } from './event.controller'
import { RequestValidation } from '../../middleware/validateRequest'
import { EventValidation } from './event.validation'
import auth from '../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()

router.route('/').get(EventController.getAllData).post(
  auth(ENUM_USER_ROLE.ADMIN),
  RequestValidation(EventValidation.create),
  EventController.insertIntoDB
)

router
  .route('/:id')
  .get(EventController.getSingleData)
  .patch(
    auth(ENUM_USER_ROLE.ADMIN),
    RequestValidation(EventValidation.update),
    EventController.updateData
  )
  .delete(auth(ENUM_USER_ROLE.ADMIN), EventController.deleteData)

export const EventRoutes = router
