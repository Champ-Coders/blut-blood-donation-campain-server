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
exports.BlogService = void 0;
const blog_model_1 = require("./blog.model");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.create(data);
    return result;
});
const getAllData = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.find({})
        .populate({
        path: 'user',
        select: ['_id', 'name', 'email', 'imgUrl'],
    })
        .populate({
        path: 'comments',
        populate: {
            path: 'userId',
            select: ['_id', 'name', 'email', 'imgUrl'],
        },
        // remove blogId from comments
        select: ['_id', 'comments', 'userId', 'createdAt', 'updatedAt', 'replay'],
    });
    return result;
});
const getSingleData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.findOne({ _id: id })
        .populate({
        path: 'user',
        select: ['_id', 'name', 'email', 'imgUrl'],
    })
        .populate({
        path: 'comments',
        populate: {
            path: 'userId',
            select: ['_id', 'name', 'email', 'imgUrl'],
        },
        // remove blogId from comments
        select: ['_id', 'comments', 'userId', 'createdAt', 'updatedAt', 'replay'],
    });
    return result;
});
const updateData = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.findOneAndDelete({ _id: id }).lean();
    return result;
});
exports.BlogService = {
    insertIntoDB,
    getAllData,
    getSingleData,
    updateData,
    deleteData,
};
