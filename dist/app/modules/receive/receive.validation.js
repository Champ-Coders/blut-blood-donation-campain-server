"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiveValidation = void 0;
const zod_1 = require("zod");
const donation_constant_1 = require("../Donor/donation.constant");
const receiveZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string({
            required_error: 'fullName is required',
        }),
        bloodGroup: zod_1.z.enum([...donation_constant_1.BloodGroups], {
            required_error: 'Blood Group is required',
        }),
        bag: zod_1.z
            .number({
            required_error: 'Bag is required',
        })
            .refine(value => value >= 1 && value <= 2, {
            message: 'Bag must be between 1 and 2',
        }),
        address: zod_1.z.string({
            required_error: 'Address is required',
        }),
        details: zod_1.z.string({
            required_error: 'Details is required',
        }),
        phoneNumber: zod_1.z
            .string({
            required_error: 'phoneNumber is required',
        })
            .min(11)
            .max(14),
    })
        .strict(),
});
exports.ReceiveValidation = {
    receiveZodSchema,
};
