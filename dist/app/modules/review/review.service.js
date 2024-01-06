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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const review_model_1 = require("./review.model");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.create(data);
    return result;
});
const getAllData = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.find({}).populate('user').populate('service');
    return result;
});
const getSingleData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.findOne({ _id: id })
        .populate('user')
        .populate('service');
    return result;
});
const updateData = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.findOneAndDelete({ _id: id }).lean();
    return result;
});
// get reviews by user id
const getReviewsByUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.find({ user: id })
        .populate('user')
        .populate('service');
    return result;
});
exports.ReviewService = {
    insertIntoDB,
    getAllData,
    getSingleData,
    updateData,
    deleteData,
    getReviewsByUserId,
};
