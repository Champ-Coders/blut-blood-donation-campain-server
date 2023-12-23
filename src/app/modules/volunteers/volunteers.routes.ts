import express from 'express'
import { VolunteersController } from './volunteers.controller'

const router = express.Router()

router.get('/', VolunteersController.getAllData)
router.get('/:id', VolunteersController.getSingleData)
router.patch('/:id', VolunteersController.updateData)
router.delete('/:id', VolunteersController.deleteData)
router.post('/create-volunteer', VolunteersController.insertIntoDB)

export const VolunteersRoutes = router
