import express from 'express'
import { ReviewController } from './review.controller'

const router = express.Router()

router.get('/', ReviewController.getAllData)
router.get('/:id', ReviewController.getSingleData)
router.patch('/:id', ReviewController.updateData)
router.delete('/:id', ReviewController.deleteData)
router.post('/create-review', ReviewController.insertIntoDB)

export const ReviewRoutes = router
