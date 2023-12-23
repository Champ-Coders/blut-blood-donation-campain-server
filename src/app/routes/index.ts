import express from 'express'
import { userRoutes } from '../modules/User/user.route'
import { BannerRoutes } from '../modules/banner/banner.routes'
import { BlogRoutes } from '../modules/blog/blog.routes'
import { FaqsRoutes } from '../modules/faqs/faqs.routes'

import { DonationRoutes } from '../modules/Donor/donation.route'
import { EventRoutes } from '../modules/event/event.routes'
import { ReviewRoutes } from '../modules/review/review.routes'
import { VolunteersRoutes } from '../modules/volunteers/volunteers.routes'

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
  {
    path: '/event',
    route: EventRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
  {
    path: '/volunteer',
    route: VolunteersRoutes,
  },
]

moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
