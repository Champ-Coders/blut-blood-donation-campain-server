import express from 'express'
import { NotificationController } from './notification.controller'

const router = express.Router()

router.get('/', NotificationController.getAllData)
router.post('/', NotificationController.createData)
router.patch('/:id', NotificationController.updateData)

export const NotificationRoutes = router
