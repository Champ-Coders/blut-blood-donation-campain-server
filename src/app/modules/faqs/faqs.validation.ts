import { z } from 'zod'

const create = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is Required!' }),
    description: z.string({ required_error: 'Description is Required!' }),
    user: z.string({ required_error: 'User is Required!' }),
  }),
})

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    user: z.string().optional(),
  }),
})

export const FaqsValidation = {
  create,
  update,
}
