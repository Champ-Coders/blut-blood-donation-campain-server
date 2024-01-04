import express from 'express'
import { chatController } from './chat.controller'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middleware/auth'

const router = express.Router()

// router.post('/create-message', chatController.createMessage)
router.get('/all-user',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER), chatController.getAllMessagedUser)
router.post('/refresh',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER), chatController.refreshMessage)

router.get('/admin/:sender',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER), chatController.getAdminMessage)

router.get('/:email',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.USER), chatController.getSingleUserMessage)

export const ChatRoutes = router
