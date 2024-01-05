"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogComment = void 0;
const mongoose_1 = require("mongoose");
const colonySchema = new mongoose_1.Schema({
    blogId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Blog' },
    comments: { type: String, required: true },
    replay: [
        {
            text: { type: String, required: true },
            commentId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'BlogComment' },
            userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
        },
    ],
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.BlogComment = (0, mongoose_1.model)('BlogComment', colonySchema);
