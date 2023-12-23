import { z } from 'zod'

const create = z.object({
  body: z.object({
    review: z.string({ required_error: 'Review is Required!' }),
    rating: z.number({ required_error: 'Rating is Required!' }),
    user: z.string({ required_error: 'User is Required!' }),
  }),
})

const update = z.object({
  body: z.object({
    review: z.string().optional(),
    rating: z.number().optional(),
    user: z.string().optional(),
  }),
})

export const ReviewValidation = {
  create,
  update,
}
