import express from 'express'
import { EventController } from './event.controller'
import { RequestValidation } from '../../middleware/validateRequest'
import { EventValidation } from './event.validation'

const router = express.Router()

router
  .route('/')
  .get(EventController.getAllData)
  .post(RequestValidation(EventValidation.create), EventController.insertIntoDB)

router
  .route('/:id')
  .get(EventController.getSingleData)
  .patch(RequestValidation(EventValidation.update), EventController.updateData)
  .delete(EventController.deleteData)

export const EventRoutes = router
