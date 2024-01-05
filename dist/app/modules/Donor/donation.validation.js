"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationValidation = void 0;
const zod_1 = require("zod");
const donation_constant_1 = require("./donation.constant");
const bloodRequestZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        donnerId: zod_1.z.string({
            required_error: 'donnerId is required',
        }),
        patientDetails: zod_1.z.string({
            required_error: 'Details is required',
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
        expectedDate: zod_1.z.string({
            required_error: 'Expected Date is required',
        }),
    })
        .strict(),
});
exports.DonationValidation = {
    bloodRequestZodSchema,
};
