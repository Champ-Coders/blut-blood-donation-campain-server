import express from 'express'
import { BlogCommentController } from './blogComment.controller'

const router = express.Router()

router.get('/', BlogCommentController.getAllData)
router.get('/:id', BlogCommentController.getSingleData)
router.patch(
  '/:id',

  BlogCommentController.updateData
)
router.delete('/:id', BlogCommentController.deleteData)
router.post(
  '/create-blog',

  BlogCommentController.insertIntoDB
)

export const BlogCommentRoutes = router
