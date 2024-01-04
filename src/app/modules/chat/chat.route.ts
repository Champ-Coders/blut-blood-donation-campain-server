import express from 'express'
import { chatController } from './chat.controller'

const router = express.Router()

// router.post('/create-message', chatController.createMessage)
router.get('/all-user', chatController.getAllMessagedUser)
router.post('/refresh', chatController.refreshMessage)

router.get('/admin/:sender', chatController.getAdminMessage)
router.get('/:email', chatController.getSingleUserMessage)

export const ChatRoutes = router
