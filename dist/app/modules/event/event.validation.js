"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title is required',
        }),
        description: zod_1.z.string({
            required_error: 'description is required',
        }),
        banner: zod_1.z.string({
            required_error: 'banner is required',
        }),
        image: zod_1.z.string({
            required_error: 'image is required',
        }),
        event_time: zod_1.z.string({
            required_error: 'Event Time is required',
        }),
        event_date: zod_1.z.string({
            required_error: 'Event Date is required',
        }),
        location: zod_1.z.string({
            required_error: 'Location is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title is required',
        }).optional(),
        description: zod_1.z.string({
            required_error: 'description is required',
        }).optional(),
        banner: zod_1.z.string({
            required_error: 'Banner Image is required',
        }).optional(),
        image: zod_1.z.string({
            required_error: 'Image is required',
        }).optional(),
        event_time: zod_1.z.string({
            required_error: 'Event Time is required',
        }).optional(),
        event_date: zod_1.z.string({
            required_error: 'Event Date is required',
        }).optional(),
        location: zod_1.z.string({
            required_error: 'Location is required',
        }).optional(),
    }),
});
exports.EventValidation = {
    create,
    update,
};
