import { z } from 'zod'
import { BloodGroups } from '../Donor/donation.constant'
import { userRoles } from './user.constant'

const createUserZodSchema = z.object({
  body: z
    .object({
      imgUrl: z.string({
        required_error: 'Image is required',
      }),
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
      address: z.object({
        village: z.string({
          required_error: 'Village is required',
        }),
        postOffice: z.string({
          required_error: 'Post Office is required',
        }),
        thana: z.string({
          required_error: 'Thana is required',
        }),
        division: z.string({
          required_error: 'Division is required',
        }),
        district: z.string({
          required_error: 'District is required',
        }),
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
      imgUrl: z.string().optional(),
      name: z.string().optional(),
      phoneNumber: z.string().min(11).max(14).optional(),
      bloodGroup: z.enum([...BloodGroups] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      address: z
        .object({
          village: z.string().optional(),
          postOffice: z.string().optional(),
          thana: z.string().optional(),
          division: z.string().optional(),
          district: z.string().optional(),
        })
        .optional(),
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

const changeRoleZodSchema = z.object({
  body: z
    .object({
      role: z.enum([...userRoles] as [string, ...string[]], {
        required_error: 'Role is required',
      }),
    })
    .strict(),
})

export const UserValidation = {
  createUserZodSchema,
  loginUserZodSchema,
  updateUserZodSchema,
  changePasswordZodSchema,
  refreshTokenZodSchema,
  changeRoleZodSchema,
}
