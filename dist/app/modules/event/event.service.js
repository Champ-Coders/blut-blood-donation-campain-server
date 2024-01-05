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
exports.EventService = void 0;
const event_model_1 = require("./event.model");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_model_1.Event.create(data);
    return result;
});
const getAllData = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_model_1.Event.find({});
    return result;
});
const getSingleData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_model_1.Event.findOne({ _id: id });
    return result;
});
const updateData = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_model_1.Event.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_model_1.Event.findOneAndDelete({ _id: id });
    return result;
});
exports.EventService = {
    insertIntoDB,
    getAllData,
    getSingleData,
    updateData,
    deleteData,
};
