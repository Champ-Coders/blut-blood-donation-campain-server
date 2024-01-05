"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
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
    banner: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    event_time: {
        type: String,
        required: true,
    },
    event_date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    is_popular: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Event = (0, mongoose_1.model)('Event', colonySchema);
