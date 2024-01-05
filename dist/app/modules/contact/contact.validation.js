"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            first_name: zod_1.z.string({ required_error: 'First Name is Required!' }),
            last_name: zod_1.z.string({ required_error: 'Last Name is Required!' }),
        }),
        email: zod_1.z.string({ required_error: 'email is Required!' }),
        subject: zod_1.z.string({ required_error: 'subject is Required!' }),
        message: zod_1.z.string({ required_error: 'message is Required!' }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .object({
            first_name: zod_1.z.string({ required_error: 'First Name is Required!' }),
            last_name: zod_1.z.string({ required_error: 'Last Name is Required!' }),
        })
            .optional(),
        email: zod_1.z.string({ required_error: 'email is Required!' }).optional(),
        subject: zod_1.z.string({ required_error: 'subject is Required!' }).optional(),
        message: zod_1.z.string({ required_error: 'message is Required!' }).optional(),
    }),
});
exports.ContactValidation = {
    create,
    update,
};
