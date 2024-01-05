"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is Required!' }),
        description: zod_1.z.string({ required_error: 'Description is Required!' }),
        image: zod_1.z.string({ required_error: 'Image is Required!' }),
        user: zod_1.z.string({ required_error: 'User is Required!' }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        user: zod_1.z.string().optional(),
    }),
});
exports.ServiceValidation = {
    create,
    update,
};
