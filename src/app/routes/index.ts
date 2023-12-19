import express from 'express'
import { userRoutes } from '../modules/User/user.route'
import { BannerRoutes } from '../modules/banner/banner.routes'
import { BlogRoutes } from '../modules/blog/blog.routes'
import { FaqsRoutes } from '../modules/faqs/faqs.routes'

import { DonationRoutes } from '../modules/Donor/donation.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/banner',
    route: BannerRoutes,
  },
  {
    path: '/faqs',
    route: FaqsRoutes,
  },
  {
    path: '/blog',
    route: BlogRoutes,
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
