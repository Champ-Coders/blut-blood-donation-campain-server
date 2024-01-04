import express from 'express'
import { ReviewController } from './review.controller'
import { RequestValidation } from '../../middleware/validateRequest'
import { ReviewValidation } from './review.validation'

const router = express.Router()

router.get('/', ReviewController.getAllData)
router.get('/:id', ReviewController.getSingleData)
router.patch(
  '/:id',
  RequestValidation(ReviewValidation.update),
  ReviewController.updateData
)
router.delete('/:id', ReviewController.deleteData)
router.post(
  '/create-review',
  RequestValidation(ReviewValidation.create),
  ReviewController.insertIntoDB
)

// get reviews by user id
router.get('/myReviews/:id', ReviewController.getReviewsByUserId)

export const ReviewRoutes = router
