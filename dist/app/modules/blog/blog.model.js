"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const mongoose_1 = require("mongoose");
const colonySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: { type: String, required: true },
    logo: { type: String, required: false },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    comments: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'BlogComment',
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Blog = (0, mongoose_1.model)('Blog', colonySchema);
