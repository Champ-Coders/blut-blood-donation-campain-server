import { z } from 'zod'

const create = z.object({
  body: z.object({
    image: z.string({ required_error: 'Image is Required!' }),
    title: z.string({ required_error: 'Title is Required!' }),
    description: z.string({ required_error: 'Description is Required!' }),
    link: z.string({ required_error: 'Link is Required!' }),
  }),
})

const update = z.object({
  body: z.object({
    image: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    link: z.string().optional(),
  }),
})

export const BannerValidation = {
  create,
  update,
}
