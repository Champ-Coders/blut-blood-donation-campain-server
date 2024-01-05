"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const donation_constant_1 = require("../Donor/donation.constant");
const receive_constant_1 = require("./receive.constant");
const bloodReceiveSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: donation_constant_1.BloodGroups,
        required: true,
    },
    bag: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: receive_constant_1.receiveStatus,
        default: 'request',
    },
}, {
    timestamps: true,
});
const BloodReceive = (0, mongoose_1.model)('BloodReceive', bloodReceiveSchema);
exports.default = BloodReceive;
