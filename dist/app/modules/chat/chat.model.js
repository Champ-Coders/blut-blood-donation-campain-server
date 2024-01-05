"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    message: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    messageType: {
        type: String,
        default: 'text',
        required: true,
    },
    senderEmail: {
        type: String,
        required: true,
    },
    receiverEmail: {
        type: String,
        required: true,
    },
    types: {
        type: String,
        default: 'comment',
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Chat = (0, mongoose_1.model)('Chat', chatSchema);
