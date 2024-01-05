"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Volunteers = void 0;
const mongoose_1 = require("mongoose");
const colonySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    linkedin: {
        type: String,
        required: true,
    },
    facebook: {
        type: String,
        required: true,
    },
    github: {
        type: String,
        required: true,
    },
    instagram: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Volunteers = (0, mongoose_1.model)('Volunteers', colonySchema);
