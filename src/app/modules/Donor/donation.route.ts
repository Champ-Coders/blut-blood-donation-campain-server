import express from 'express'
import { DonationController } from './donation.controller'
import auth from '../../middleware/auth'

const router = express.Router()

router.get('/', DonationController.getAllDonationInfo)

router.get('/:id', DonationController.getSingleDonationInfo)

router.post('/request', auth(), DonationController.bloodRequest)

router.patch('/cancel-request/:id', auth(), DonationController.cancelRequest)

router.patch('/accept-request/:id', auth(), DonationController.acceptRequest)

export const DonationRoutes = router
