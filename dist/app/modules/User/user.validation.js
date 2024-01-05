"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const donation_constant_1 = require("../Donor/donation.constant");
const user_constant_1 = require("./user.constant");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        imgUrl: zod_1.z.string({
            required_error: 'Image is required',
        }),
        name: zod_1.z.string({
            required_error: 'fullName is required',
        }),
        email: zod_1.z.string().email({ message: 'Invalid email format' }).optional(),
        phoneNumber: zod_1.z
            .string({
            required_error: 'phoneNumber is required',
        })
            .min(11)
            .max(14),
        password: zod_1.z
            .string({
            required_error: 'password is required',
        })
            .min(3)
            .max(15),
        bloodGroup: zod_1.z.enum([...donation_constant_1.BloodGroups], {
            required_error: 'Blood Group is required',
        }),
        dateOfBirth: zod_1.z.string({
            required_error: 'Date of birth is required',
        }),
        address: zod_1.z.object({
            village: zod_1.z.string({
                required_error: 'Village is required',
            }),
            postOffice: zod_1.z.string({
                required_error: 'Post Office is required',
            }),
            thana: zod_1.z.string({
                required_error: 'Thana is required',
            }),
            division: zod_1.z.string({
                required_error: 'Division is required',
            }),
            district: zod_1.z.string({
                required_error: 'District is required',
            }),
        }),
        available: zod_1.z.boolean().optional(),
        totalDonation: zod_1.z.number().optional(),
    })
        .strict(),
});
const loginUserZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'password is required',
        }),
    })
        .strict(),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        imgUrl: zod_1.z.string().optional(),
        name: zod_1.z.string().optional(),
        phoneNumber: zod_1.z.string().min(11).max(14).optional(),
        bloodGroup: zod_1.z.enum([...donation_constant_1.BloodGroups]).optional(),
        dateOfBirth: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        // address: z
        //   .object({
        //     village: z.string().optional(),
        //     postOffice: z.string().optional(),
        //     thana: z.string().optional(),
        //     division: z.string().optional(),
        //     district: z.string().optional(),
        //   })
        //   .optional(),
        available: zod_1.z.boolean().optional(),
        totalDonation: zod_1.z.number().optional(),
    })
        .strict(),
});
const changePasswordZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        oldPassword: zod_1.z
            .string({
            required_error: 'Old password is required',
        })
            .min(3)
            .max(15),
        newPassword: zod_1.z
            .string({
            required_error: 'New password is required',
        })
            .min(3)
            .max(15),
    })
        .strict(),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
const changeRoleZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        role: zod_1.z.enum([...user_constant_1.userRoles], {
            required_error: 'Role is required',
        }),
    })
        .strict(),
});
exports.UserValidation = {
    createUserZodSchema,
    loginUserZodSchema,
    updateUserZodSchema,
    changePasswordZodSchema,
    refreshTokenZodSchema,
    changeRoleZodSchema,
};
