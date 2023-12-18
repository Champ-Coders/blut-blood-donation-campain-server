import express from 'express'
import { BlogController } from './blog.controller'

const router = express.Router()

router.get('/', BlogController.getAllData)
router.get('/:id', BlogController.getSingleData)
router.patch(
  '/:id',

  BlogController.updateData
)
router.delete('/:id', BlogController.deleteData)
router.post(
  '/create-blog',

  BlogController.insertIntoDB
)

export const BlogRoutes = router
