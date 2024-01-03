import express from 'express'
import { userRoutes } from '../modules/User/user.route'
import { BannerRoutes } from '../modules/banner/banner.routes'
import { BlogRoutes } from '../modules/blog/blog.routes'
import { FaqsRoutes } from '../modules/faqs/faqs.routes'

import { DonationRoutes } from '../modules/Donor/donation.route'
import { BlogCommentRoutes } from '../modules/blogComment/blogComment.routes'
import { ChatRoutes } from '../modules/chat/chat.route'
import { ContactRoutes } from '../modules/contact/contact.routes'
import { EventRoutes } from '../modules/event/event.routes'
import { NotificationRoutes } from '../modules/notification/notification.routes'
import { ReceiveRoutes } from '../modules/receive/receive.route'
import { ReviewRoutes } from '../modules/review/review.routes'
import { ServicesRoutes } from '../modules/services/services.routes'
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
    path: '/services',
    route: ServicesRoutes,
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
  {
    path: '/blog-comment',
    route: BlogCommentRoutes,
  },
  {
    path: '/receive',
    route: ReceiveRoutes,
  },
  {
    path: '/contact',
    route: ContactRoutes,
  },
  {
    path: '/chat',
    route: ChatRoutes,
  },
  {
    path: '/notification',
    route: NotificationRoutes,
  },
]

moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
