import express from 'express'
import { VolunteersController } from './volunteers.controller'
import auth from '../../middleware/auth'
import { RequestValidation } from '../../middleware/validateRequest'
import { VolunteersValidation } from './volunteers.validation'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()

router.get('/', VolunteersController.getAllData)
router.get('/:id', VolunteersController.getSingleData)
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  RequestValidation(VolunteersValidation.update),
  VolunteersController.updateData
)
router.delete('/:id', VolunteersController.deleteData)
router.post(
  '/create-volunteer',
  //   auth(ENUM_USER_ROLE.ADMIN),
  RequestValidation(VolunteersValidation.create),
  VolunteersController.insertIntoDB
)

export const VolunteersRoutes = router
