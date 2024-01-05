"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const donation_constant_1 = require("./donation.constant");
const donationSchema = new mongoose_1.Schema({
    donnerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    patientDetails: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: donation_constant_1.BloodGroups,
        required: true,
    },
    expectedDate: {
        type: Date,
        required: true,
    },
    bag: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: donation_constant_1.donationStatus,
        default: 'pending',
    },
}, {
    timestamps: true,
});
const Donation = (0, mongoose_1.model)('Donation', donationSchema);
exports.default = Donation;
