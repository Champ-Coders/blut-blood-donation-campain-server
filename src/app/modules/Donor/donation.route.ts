import express from 'express'
import { DonationController } from './donation.controller'
import auth from '../../middleware/auth'
import { RequestValidation } from '../../middleware/validateRequest'
import { DonationValidation } from './donation.validation'

const router = express.Router()

router.get('/', DonationController.getAllDonationInfo)

router.get('/:id', DonationController.getSingleDonationInfo)

router.post(
  '/request',
  auth(),
  RequestValidation(DonationValidation.bloodRequestZodSchema),
  DonationController.bloodRequest
)

router.patch('/cancel-request/:id', auth(), DonationController.cancelRequest)

router.patch('/accept-request/:id', auth(), DonationController.acceptRequest)

export const DonationRoutes = router
