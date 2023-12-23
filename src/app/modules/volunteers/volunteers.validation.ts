import { z } from 'zod'

const create = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is Required!' }),
    designation: z.string({ required_error: 'designation is Required!' }),
    facebook: z.string({ required_error: 'facebook is Required!' }),
    linkedin: z.string({ required_error: 'linkedin is Required!' }),
    github: z.string({ required_error: 'github is Required!' }),
    instagram: z.string({ required_error: 'instagram is Required!' }),
  }),
})

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    designation: z.string().optional(),
    facebook: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    instagram: z.string().optional(),
  }),
})

export const VolunteersValidation = {
  create,
  update,
}
