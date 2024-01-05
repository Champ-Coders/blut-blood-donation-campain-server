"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faqs = void 0;
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
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Faqs = (0, mongoose_1.model)('Faqs', colonySchema);
