import express from 'express'
import { BannerController } from './banner.controller'

const router = express.Router()

router.get('/', BannerController.getAllData)
router.get('/:id', BannerController.getSingleData)
router.patch(
  '/:id',

  BannerController.updateData
)
router.delete('/:id', BannerController.deleteData)
router.post(
  '/create-Banner',

  BannerController.insertIntoDB
)

export const BannerRoutes = router
