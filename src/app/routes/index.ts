import express from 'express'
import { userRoutes } from '../modules/User/user.route'
import { DonationRoutes } from '../modules/Donor/donation.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/donation',
    route: DonationRoutes,
  },
]

moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
