"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const user_modal_1 = require("../User/user.modal");
const notification_model_1 = require("../notification/notification.model");
const donation_constant_1 = require("./donation.constant");
const donation_modal_1 = __importDefault(require("./donation.modal"));
const bloodRequest = (payload, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_modal_1.User.findById(userInfo.id);
    if (!user) {
        throw new ApiErrors_1.default(http_status_1.default.CONFLICT, 'Your profile does not exist!!!');
    }
    const donor = yield user_modal_1.User.findById(payload.donnerId);
    if (!donor) {
        throw new ApiErrors_1.default(http_status_1.default.CONFLICT, 'Donor does not exist!!!');
    }
    if (payload.bloodGroup != donor.bloodGroup) {
        throw new ApiErrors_1.default(http_status_1.default.CONFLICT, "Donor's blood group is not matching with your request.");
    }
    payload.userId = userInfo.id;
    const session = yield mongoose_1.default.startSession();
    // {
    //   bag: 1,
    //   donnerId: '6582ba903e41d51f5948ff4e',
    //   bloodGroup: 'A-',
    //   expectedDate: '2024-01-05',
    //   patientDetails: 'ami rokto cai '
    // } {
    //   id: '658bd18fc79d3b5406a1b6e1',
    //   email: 'admin@admin.com',
    //   role: 'admin',
    //   iat: 1704272913,
    //   exp: 1704359313
    // } faysal
    let result;
    try {
        session.startTransaction();
        result = yield donation_modal_1.default.create([payload], { session });
        yield notification_model_1.Notification.create([
            {
                hasNotification: true,
                user: payload.donnerId,
                notificationTitle: `Blood Request from ${user.name} group ${payload.bloodGroup}`,
                notificationBody: `Request for ${payload.bloodGroup} blood group. Date ${payload.expectedDate}`,
            },
        ], { session });
        yield user_modal_1.User.findOneAndUpdate({ _id: payload.donnerId }, { $inc: { notification: 1 } }, {
            session,
        });
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    return result[0];
});
const getAllDonationInfo = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    // for filter data
    if (searchTerm) {
        andConditions.push({
            $or: donation_constant_1.donationFilterableField.map(field => ({
                [field]: { $regex: searchTerm, $options: 'i' },
            })),
        });
    }
    // for exact match user and condition
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    // if no condition is given
    const query = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield donation_modal_1.default.find(query)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate(['userId', 'donnerId']);
    const total = yield donation_modal_1.default.countDocuments(query);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleDonationInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield donation_modal_1.default.findById(id).populate(['userId', 'donnerId']);
    if (!result) {
        throw new ApiErrors_1.default(http_status_1.default.CONFLICT, 'Info is not exist!!!');
    }
    return result;
});
const acceptRequest = (id, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const donationRequest = yield donation_modal_1.default.findById(id);
    if (!donationRequest) {
        throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'There is info with this id!!!');
    }
    const donor = yield user_modal_1.User.findById(userInfo.id);
    if (!donor) {
        throw new ApiErrors_1.default(http_status_1.default.CONFLICT, 'Your profile does not exist!!!');
    }
    if (userInfo.id.toString() !== donationRequest.donnerId.toString()) {
        throw new ApiErrors_1.default(http_status_1.default.UNAUTHORIZED, 'This request is not for you!!!');
    }
    if (donationRequest.status != 'pending') {
        throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, `Already accept the request!!!`);
    }
    const session = yield mongoose_1.default.startSession();
    let result;
    try {
        session.startTransaction();
        yield user_modal_1.User.findOneAndUpdate({ _id: donationRequest.donnerId }, {
            $inc: { notification: -1, totalDonation: 1 },
            $set: { lastDonation: new Date(), available: false },
        }, {
            session,
        });
        result = yield donation_modal_1.default.findByIdAndUpdate(id, { $set: { status: 'accept' } }, { new: true, session });
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    console.log(result, 'result Faysal 0');
    return result;
});
const acceptRequestByAdmin = (id, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const donationRequest = yield donation_modal_1.default.findById(id);
    if (!donationRequest) {
        throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'There is info with this id!!!');
    }
    const donor = yield user_modal_1.User.findById(userInfo.id);
    if (!donor) {
        throw new ApiErrors_1.default(http_status_1.default.CONFLICT, 'Your profile does not exist!!!');
    }
    if (donor.role != 'admin') {
        throw new ApiErrors_1.default(http_status_1.default.UNAUTHORIZED, 'You are not an admin!!!');
    }
    if (donationRequest.status != 'pending') {
        throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, `Already accept the request!!!`);
    }
    const session = yield mongoose_1.default.startSession();
    let result;
    try {
        session.startTransaction();
        yield user_modal_1.User.findOneAndUpdate({ _id: donationRequest.donnerId }, {
            $inc: { notification: -1, totalDonation: 1 },
            $set: { lastDonation: new Date(), available: false },
        }, {
            session,
        });
        yield notification_model_1.Notification.create([
            {
                hasNotification: true,
                user: donationRequest.userId,
                notificationTitle: `Blood Request Accepted`,
                notificationBody: `Your request for ${donationRequest.bloodGroup} blood group is accepted.`,
            },
        ], { session });
        result = yield donation_modal_1.default.findByIdAndUpdate(id, { $set: { status: 'accept' } }, { new: true, session });
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    console.log(result, 'result Faysal 1');
    return result;
});
const cancelRequest = (id, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const donationRequest = yield donation_modal_1.default.findById(id);
    if (!donationRequest) {
        throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'There is info with this id!!!');
    }
    const user = yield user_modal_1.User.findById(userInfo.id);
    if (!user) {
        throw new ApiErrors_1.default(http_status_1.default.CONFLICT, 'Your profile does not exist!!!');
    }
    if (userInfo.id.toString() !== donationRequest.donnerId.toString() &&
        userInfo.id.toString() !== donationRequest.userId.toString()) {
        throw new ApiErrors_1.default(http_status_1.default.UNAUTHORIZED, 'This is not for you!!!');
    }
    if (donationRequest.status != 'pending') {
        throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, `Already accept the request!!!`);
    }
    const session = yield mongoose_1.default.startSession();
    let result;
    try {
        session.startTransaction();
        yield user_modal_1.User.findOneAndUpdate({ _id: donationRequest.donnerId }, {
            $inc: { notification: -1 },
        }, {
            session,
        });
        yield notification_model_1.Notification.create([
            {
                hasNotification: true,
                user: donationRequest.userId,
                notificationTitle: `Blood Request Canceled`,
                notificationBody: `Your request for ${donationRequest.bloodGroup} blood group is canceled.`,
            },
        ], { session });
        result = yield donation_modal_1.default.findByIdAndUpdate(id, { $set: { status: 'canceled' } }, { new: true, session });
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    console.log(result, 'result Faysal 2');
    return result;
});
const donationRequest = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_modal_1.User.findById(userInfo.id).select('+notification');
    if (!user) {
        throw new ApiErrors_1.default(http_status_1.default.CONFLICT, 'Your profile is not exist!!!');
    }
    //  user not found
    if (!user) {
        throw new ApiErrors_1.default(http_status_1.default.CONFLICT, 'User is not exist!!!');
    }
    const result = yield donation_modal_1.default.find({
        donnerId: userInfo.id,
        status: 'pending',
    }).populate(['userId', 'donnerId']);
    console.log(result, 'result');
    return result;
});
const donationHistory = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_modal_1.User.findById(userInfo.id).select('+notification');
    //  user not found
    if (!user) {
        throw new ApiErrors_1.default(http_status_1.default.CONFLICT, 'User is not exist!!!');
    }
    const result = yield donation_modal_1.default.find({
        donnerId: userInfo.id,
    }).populate(['userId', 'donnerId']);
    return result;
});
exports.DonationService = {
    getAllDonationInfo,
    getSingleDonationInfo,
    bloodRequest,
    cancelRequest,
    acceptRequest,
    acceptRequestByAdmin,
    donationRequest,
    donationHistory,
};
