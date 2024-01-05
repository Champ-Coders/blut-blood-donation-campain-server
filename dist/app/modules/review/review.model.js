"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const colonySchema = new mongoose_1.Schema({
    review: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    service: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Service',
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Review = (0, mongoose_1.model)('Review', colonySchema);
