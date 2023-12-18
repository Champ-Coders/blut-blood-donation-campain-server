import express from 'express'
import { FaqsController } from './faqs.controller'

const router = express.Router()

router.get('/', FaqsController.getAllData)
router.get('/:id', FaqsController.getSingleData)
router.patch('/:id', FaqsController.updateData)
router.delete('/:id', FaqsController.deleteData)
router.post(
  '/create-faqs',

  FaqsController.insertIntoDB
)

export const FaqsRoutes = router
