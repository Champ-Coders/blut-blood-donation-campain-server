import express from 'express'
import { DonationController } from './donation.controller'
import auth from '../../middleware/auth'
import { RequestValidation } from '../../middleware/validateRequest'
import { DonationValidation } from './donation.validation'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()

router.get('/', DonationController.getAllDonationInfo)

router.get('/request', auth(), DonationController.donationRequest)

router.get('/history', auth(), DonationController.donationHistory)

router.get('/:id', DonationController.getSingleDonationInfo)

router.post(
  '/request',
  auth(),
  RequestValidation(DonationValidation.bloodRequestZodSchema),
  DonationController.bloodRequest
)

router.patch('/cancel-request/:id', auth(), DonationController.cancelRequest)

router.patch('/accept-request/:id', auth(), DonationController.acceptRequest)

router.patch(
  '/accept-request-admin/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  DonationController.acceptRequestByAdmin
)

export const DonationRoutes = router
