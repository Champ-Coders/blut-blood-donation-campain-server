import express from 'express'

import { RequestValidation } from '../../middleware/validateRequest'

import auth from '../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
import { ContactController } from './contact.controller'
import { ContactValidation } from './contact.validation'

const router = express.Router()

router.get('/', ContactController.getAllData)
router.get('/:id', ContactController.getSingleData)
router.patch(
  '/:id',
  RequestValidation(ContactValidation.update),
  ContactController.updateData
)
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), ContactController.deleteData)
router.post(
  '/create-Contact',
  RequestValidation(ContactValidation.create),
  ContactController.insertIntoDB
)

export const ContactRoutes = router
