import { z } from 'zod'
import { BloodGroups } from './donation.constant'

const bloodRequestZodSchema = z.object({
  body: z
    .object({
      donnerId: z.string({
        required_error: 'donnerId is required',
      }),
      patientDetails: z.string({
        required_error: 'Details is required',
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
      expectedDate: z.string({
        required_error: 'Expected Date is required',
      }),
    })
    .strict(),
})

export const DonationValidation = {
  bloodRequestZodSchema,
}
