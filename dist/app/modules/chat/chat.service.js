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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const user_modal_1 = require("../User/user.modal");
const chat_model_1 = require("./chat.model");
const user_1 = require("../../../enums/user");
// import { UserService } from '../User/user.service'
const createmessage = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('🚀 ~ file: chat.service.ts:2 ~ payload:', payload)
    const checkEmail = yield user_modal_1.User.findOne({ email: payload.email });
    // console.log(
    //   '🚀 ~ file: chat.service.ts:8 ~ constchat_message= ~ checkEmail:',
    //   checkEmail
    // )
    if (!checkEmail) {
        throw new ApiErrors_1.default(http_status_1.default.CONFLICT, 'Could not find the user!!!');
    }
    else {
        payload.role = checkEmail.role;
    }
    const updateUserIsChat = yield user_modal_1.User.findOneAndUpdate({ _id: checkEmail === null || checkEmail === void 0 ? void 0 : checkEmail._id }, {
        isChat: true,
        chatTime: Date.now(),
    }, {
        new: true,
    });
    if ((payload === null || payload === void 0 ? void 0 : payload.type) === 'reply') {
        const isUserById = yield user_modal_1.User.findById(payload === null || payload === void 0 ? void 0 : payload._id);
        const createMessage = yield chat_model_1.Chat.create({
            message: payload === null || payload === void 0 ? void 0 : payload.message,
            img: (payload === null || payload === void 0 ? void 0 : payload.img) ||
                'https://img.freepik.com/free-photo/confident-attractive-caucasian-guy-beige-pullon-smiling-broadly-while-standing-against-gray_176420-44508.jpg?w=1380&t=st=1704185130~exp=1704185730~hmac=59e603b1b189517200baee240e19841cac32cac33e3b18bf388d3af232517699',
            senderEmail: isUserById === null || isUserById === void 0 ? void 0 : isUserById.email,
            receiverEmail: 'admin@admin.com',
            types: 'reply',
        });
        console.log('🚀 ~ file: chat.service.ts:45 ~ constchat_message= ~ createMessage:', createMessage);
        return createMessage;
    }
    const createMessageData = {
        message: payload === null || payload === void 0 ? void 0 : payload.message,
        img: (payload === null || payload === void 0 ? void 0 : payload.img) ||
            'https://img.freepik.com/free-photo/confident-attractive-caucasian-guy-beige-pullon-smiling-broadly-while-standing-against-gray_176420-44508.jpg?w=1380&t=st=1704185130~exp=1704185730~hmac=59e603b1b189517200baee240e19841cac32cac33e3b18bf388d3af232517699',
        senderEmail: updateUserIsChat === null || updateUserIsChat === void 0 ? void 0 : updateUserIsChat.email,
        receiverEmail: 'admin@admin.com',
    };
    console.log('🚀 ~ file: chat.service.ts:37 ~ createmessage ~ createMessageData:', createMessageData);
    const createMessage = yield chat_model_1.Chat.create(createMessageData);
    return createMessage;
});
const createreply = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('🚀 ~ file: chat.service.ts:53 ~ createreply ~ payload:', payload);
    const checkEmail = yield user_modal_1.User.findOne({ email: payload.email });
    console.log('🚀 ~ file: chat.service.ts:8 ~ constchat_message= ~ checkEmail:', checkEmail);
    if (!checkEmail) {
        throw new ApiErrors_1.default(http_status_1.default.CONFLICT, 'Could not find the user!!!');
    }
    else {
        payload.role = checkEmail.role;
    }
    const updateUserIsChat = yield user_modal_1.User.findOneAndUpdate({ _id: checkEmail === null || checkEmail === void 0 ? void 0 : checkEmail._id }, {
        isChat: true,
    }, {
        new: true,
    });
    const createMessageData = {
        message: payload === null || payload === void 0 ? void 0 : payload.message,
        img: (payload === null || payload === void 0 ? void 0 : payload.img) ||
            'https://img.freepik.com/free-photo/confident-attractive-caucasian-guy-beige-pullon-smiling-broadly-while-standing-against-gray_176420-44508.jpg?w=1380&t=st=1704185130~exp=1704185730~hmac=59e603b1b189517200baee240e19841cac32cac33e3b18bf388d3af232517699',
        senderEmail: 'admin@admin.com',
        receiverEmail: updateUserIsChat === null || updateUserIsChat === void 0 ? void 0 : updateUserIsChat.email,
    };
    console.log('🚀 ~ file: chat.service.ts:37 ~ createmessage ~ createMessageData:', createMessageData);
    const createMessage = yield chat_model_1.Chat.create(createMessageData);
    console.log('🚀 ~ file: chat.service.ts:45 ~ constchat_message= ~ createMessage:', createMessage);
    return createMessage;
});
const getAllMessagedUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUser = yield user_modal_1.User.find({
        isChat: true,
        role: user_1.ENUM_USER_ROLE.USER,
    }).sort({ chatTime: 'desc' });
    return allUser;
});
const getSIngleUserMessage = (senderEmail, receiverEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllMessage = yield chat_model_1.Chat.find({
        $or: [
            { senderEmail: senderEmail, receiverEmail },
            { senderEmail: senderEmail, receiverEmail: receiverEmail },
        ],
    });
    return getAllMessage;
});
const getAdminMessage = (senderId, receiverEmail) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(senderId, receiverEmail)
    const senderData = yield user_modal_1.User.findById(senderId);
    // console.log('🚀 ~ file: chat.service.ts:65 ~ senderData:', senderData)
    const getAllMessage = yield chat_model_1.Chat.find({
        $or: [
            { senderEmail: senderData === null || senderData === void 0 ? void 0 : senderData.email, receiverEmail },
            { senderEmail: senderData === null || senderData === void 0 ? void 0 : senderData.email, receiverEmail: receiverEmail },
        ],
    });
    // .sort({ updatedAt: 'desc' })
    // console.log("🚀 ~ file: chat.service.ts:161 ~ getAdminMessage ~ getAllMessage:", getAllMessage)
    return getAllMessage;
});
exports.chatService = {
    createmessage,
    getSIngleUserMessage,
    getAllMessagedUser,
    getAdminMessage,
    createreply,
};
