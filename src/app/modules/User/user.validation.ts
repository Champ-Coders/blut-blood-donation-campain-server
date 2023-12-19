import { z } from 'zod'
import { BloodGroups } from '../Donor/donation.constant'

const createUserZodSchema = z.object({
  body: z
    .object({
      name: z.string({
        required_error: 'fullName is required',
      }),
      email: z.string().email({ message: 'Invalid email format' }).optional(),
      phoneNumber: z
        .string({
          required_error: 'phoneNumber is required',
        })
        .min(11)
        .max(14),
      password: z
        .string({
          required_error: 'password is required',
        })
        .min(3)
        .max(15),
      bloodGroup: z.enum([...BloodGroups] as [string, ...string[]], {
        required_error: 'Blood Group is required',
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      address: z.string({
        required_error: 'Address is required',
      }),
      available: z.boolean().optional(),
      totalDonation: z.number().optional(),
    })
    .strict(),
})

const loginUserZodSchema = z.object({
  body: z
    .object({
      email: z.string({
        required_error: 'Email is required',
      }),
      password: z.string({
        required_error: 'password is required',
      }),
    })
    .strict(),
})

const updateUserZodSchema = z.object({
  body: z
    .object({
      name: z.string().optional(),
      phoneNumber: z.string().min(11).max(14).optional(),
      bloodGroup: z.enum([...BloodGroups] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      address: z.string().optional(),
      available: z.boolean().optional(),
      totalDonation: z.number().optional(),
    })
    .strict(),
})

const changePasswordZodSchema = z.object({
  body: z
    .object({
      oldPassword: z
        .string({
          required_error: 'Old password is required',
        })
        .min(3)
        .max(15),
      newPassword: z
        .string({
          required_error: 'New password is required',
        })
        .min(3)
        .max(15),
    })
    .strict(),
})
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
})

export const UserValidation = {
  createUserZodSchema,
  loginUserZodSchema,
  updateUserZodSchema,
  changePasswordZodSchema,
  refreshTokenZodSchema,
}
