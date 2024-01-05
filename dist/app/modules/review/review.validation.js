"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        review: zod_1.z.string({ required_error: 'Review is Required!' }),
        rating: zod_1.z.number({ required_error: 'Rating is Required!' }),
        service: zod_1.z.string({ required_error: 'Service is Required!' }),
        user: zod_1.z.string({ required_error: 'User is Required!' }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        review: zod_1.z.string().optional(),
        rating: zod_1.z.number().optional(),
        service: zod_1.z.string().optional(),
        user: zod_1.z.string().optional(),
    }),
});
exports.ReviewValidation = {
    create,
    update,
};
