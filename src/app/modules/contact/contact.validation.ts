import { z } from 'zod'

const create = z.object({
  body: z.object({
    name: z.object({
      first_name: z.string({ required_error: 'First Name is Required!' }),
      last_name: z.string({ required_error: 'Last Name is Required!' }),
    }),
    email: z.string({ required_error: 'email is Required!' }),
    subject: z.string({ required_error: 'subject is Required!' }),
    message: z.string({ required_error: 'message is Required!' }),
    user: z.string({ required_error: 'User is Required!' }),
  }),
})

const update = z.object({
  body: z.object({
    name: z
      .object({
        first_name: z.string({ required_error: 'First Name is Required!' }),
        last_name: z.string({ required_error: 'Last Name is Required!' }),
      })
      .optional(),
    email: z.string({ required_error: 'email is Required!' }).optional(),
    subject: z.string({ required_error: 'subject is Required!' }).optional(),
    message: z.string({ required_error: 'message is Required!' }).optional(),
    user: z.string({ required_error: 'User is Required!' }).optional(),
  }),
})

export const ContactValidation = {
  create,
  update,
}
