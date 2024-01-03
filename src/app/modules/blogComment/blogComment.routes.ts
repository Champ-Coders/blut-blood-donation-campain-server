import express from 'express'
import { BlogCommentController } from './blogComment.controller'

const router = express.Router()

router.post(
  '/',

  BlogCommentController.insertIntoDB
)
router.get('/', BlogCommentController.getAllData)
router.get('/:id', BlogCommentController.getSingleData)
router.patch(
  '/:id',

  BlogCommentController.updateData
)
router.delete('/:id', BlogCommentController.deleteData)

export const BlogCommentRoutes = router
