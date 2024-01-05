"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        image: zod_1.z.string({ required_error: 'Image is Required!' }),
        title: zod_1.z.string({ required_error: 'Title is Required!' }),
        description: zod_1.z.string({ required_error: 'Description is Required!' }),
        link: zod_1.z.string({ required_error: 'Link is Required!' }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        image: zod_1.z.string().optional(),
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        link: zod_1.z.string().optional(),
    }),
});
exports.BannerValidation = {
    create,
    update,
};
