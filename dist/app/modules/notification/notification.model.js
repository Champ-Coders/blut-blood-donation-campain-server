"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const mongoose_1 = require("mongoose");
const notificationSchema = new mongoose_1.Schema({
    notificationBody: {
        type: String,
        optional: true,
    },
    hasNotification: {
        type: Boolean,
        default: false,
    },
    notificationTitle: {
        type: String,
        optional: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Notification = (0, mongoose_1.model)('Notification', notificationSchema);
