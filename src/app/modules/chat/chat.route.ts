import express from 'express'


const router = express.Router()

router.post('/', ChatController.getAllData)
router.get('/:id', ChatController.getSingleData)
router.patch(
  '/:id',

  ChatController.updateData
)
router.delete('/:id', ChatController.deleteData)
router.post(
  '/create-Chat',

  ChatController.insertIntoDB
)

export const ChatRoutes = router
