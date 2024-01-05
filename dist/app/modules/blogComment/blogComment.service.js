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
exports.BlogCommentService = void 0;
const blog_model_1 = require("../blog/blog.model");
const blogComment_model_1 = require("./blogComment.model");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogComment_model_1.BlogComment.create(data);
    yield blog_model_1.Blog.findOneAndUpdate({ _id: data.blogId }, { $push: { comments: result._id } }, { new: true });
    return result;
});
const getAllData = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogComment_model_1.BlogComment.find({})
        .populate('blogId')
        .populate({
        path: 'userId',
        model: 'User',
    })
        .populate({
        path: 'replay.userId',
        model: 'User',
    })
        .exec();
    return result;
});
const getSingleData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogComment_model_1.BlogComment.findOne({ _id: id })
        .populate('blogId')
        .populate('userId')
        .exec();
    return result;
});
const updateData = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogComment_model_1.BlogComment.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // remove comment from Blog
    yield blog_model_1.Blog.findOneAndUpdate({ comments: id }, { $pull: { comments: id } }, { new: true });
    const result = yield blogComment_model_1.BlogComment.findOneAndDelete({ _id: id });
    return result;
});
// get comments by user id
const getCommentsByUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogComment_model_1.BlogComment.find({ userId: id })
        .populate('blogId')
        .populate('userId')
        .exec();
    return result;
});
exports.BlogCommentService = {
    insertIntoDB,
    getAllData,
    getSingleData,
    updateData,
    deleteData,
    getCommentsByUserId,
};
