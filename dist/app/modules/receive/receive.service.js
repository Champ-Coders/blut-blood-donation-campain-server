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
exports.ReceiveService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_modal_1 = require("../User/user.modal");
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const receive_modal_1 = __importDefault(require("./receive.modal"));
const request = (payload, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_modal_1.User.findById(userInfo === null || userInfo === void 0 ? void 0 : userInfo.id);
    if (!user) {
        throw new ApiErrors_1.default(http_status_1.default.CONFLICT, 'Your profile does not exist!!!');
    }
    payload.userId = userInfo.id;
    const result = yield receive_modal_1.default.create(payload);
    return result;
});
const getAllDataDB = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('🚀 ~ file: receive.service.ts:23 ~ getAllDataDB ~ userInfo:', userInfo);
    const result = yield receive_modal_1.default.find({ userId: userInfo.id });
    return result;
});
exports.ReceiveService = {
    request,
    getAllDataDB,
};
