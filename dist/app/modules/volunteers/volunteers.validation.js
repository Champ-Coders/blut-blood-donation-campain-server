"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VolunteersValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is Required!' }),
        designation: zod_1.z.string({ required_error: 'designation is Required!' }),
        image: zod_1.z.string({ required_error: 'image is Required!' }),
        facebook: zod_1.z.string({ required_error: 'facebook is Required!' }),
        linkedin: zod_1.z.string({ required_error: 'linkedin is Required!' }),
        github: zod_1.z.string({ required_error: 'github is Required!' }),
        instagram: zod_1.z.string({ required_error: 'instagram is Required!' }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        designation: zod_1.z.string().optional(),
        facebook: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        linkedin: zod_1.z.string().optional(),
        github: zod_1.z.string().optional(),
        instagram: zod_1.z.string().optional(),
    }),
});
exports.VolunteersValidation = {
    create,
    update,
};
