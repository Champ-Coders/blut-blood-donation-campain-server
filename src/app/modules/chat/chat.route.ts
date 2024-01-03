import express from 'express'
import { chatController } from './chat.controller'


const router = express.Router()

router.post('/create-message', chatController.createMessage)
router.get('/all-user', chatController.getAllMessagedUser)
router.get('/all-user', chatController.getAllMessagedUser)


export const ChatRoutes = router
