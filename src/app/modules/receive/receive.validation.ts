import { z } from 'zod'
import { BloodGroups } from '../Donor/donation.constant'

const receiveZodSchema = z.object({
  body: z
    .object({
      name: z.string({
        required_error: 'fullName is required',
      }),
      bloodGroup: z.enum([...BloodGroups] as [string, ...string[]], {
        required_error: 'Blood Group is required',
      }),
      bag: z
        .number({
          required_error: 'Bag is required',
        })
        .refine(value => value >= 1 && value <= 2, {
          message: 'Bag must be between 1 and 2',
        }),
      address: z.string({
        required_error: 'Address is required',
      }),
      details: z.string({
        required_error: 'Details is required',
      }),
      phoneNumber: z
        .string({
          required_error: 'phoneNumber is required',
        })
        .min(11)
        .max(14),
    })
    .strict(),
})

export const ReceiveValidation = {
  receiveZodSchema,
}
