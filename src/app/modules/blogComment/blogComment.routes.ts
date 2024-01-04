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
// get comments by user id
router.get('/myComments/:id', BlogCommentController.getCommentsByUserId)




export const BlogCommentRoutes = router
