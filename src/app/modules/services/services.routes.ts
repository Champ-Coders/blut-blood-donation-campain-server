import express from 'express'
import { ServicesController } from './services.controller'

const router = express.Router()

router.get('/', ServicesController.getAllData)
router.get('/:id', ServicesController.getSingleData)
router.patch('/:id', ServicesController.updateData)
router.delete('/:id', ServicesController.deleteData)
router.post(
  '/create-services',

  ServicesController.insertIntoDB
)

export const ServicesRoutes = router
