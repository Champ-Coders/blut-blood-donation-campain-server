import express from 'express'
import { ReviewController } from './contact.controller'
import { RequestValidation } from '../../middleware/validateRequest'
import { ReviewValidation } from './review.validation'
import auth from '../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()

router.get('/', ReviewController.getAllData)
router.get('/:id', ReviewController.getSingleData)
router.patch(
  '/:id',
  RequestValidation(ReviewValidation.update),
  ReviewController.updateData
)
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), ReviewController.deleteData)
router.post(
  '/create-review',
  RequestValidation(ReviewValidation.create),
  ReviewController.insertIntoDB
)

export const ReviewRoutes = router
