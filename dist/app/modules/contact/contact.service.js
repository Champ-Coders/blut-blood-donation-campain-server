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
exports.ContactService = void 0;
const contact_model_1 = require("./contact.model");
const sendMail_1 = require("./sendMail");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log('🚀 ~ file: contact.service.ts:6 ~ insertIntoDB ~ data:', data);
    const contactHTML = `
  <!DOCTYPE html>
  <html lang="en">
 <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Message Confirmation</title>
 </head>
 <body style="font-family: 'Arial', sans-serif;">
  <p>Hello I am  ${(_a = data === null || data === void 0 ? void 0 : data.name) === null || _a === void 0 ? void 0 : _a.first_name} ${(_b = data === null || data === void 0 ? void 0 : data.name) === null || _b === void 0 ? void 0 : _b.last_name},</p>
  <p>My message from Blood donation website</p>
  <p><strong>${data === null || data === void 0 ? void 0 : data.message}</p>
  <p>Thank you </p>
 </body>
 </html>

  `;
    const sendMail = yield (0, sendMail_1.sendMailer)(data === null || data === void 0 ? void 0 : data.subject, data === null || data === void 0 ? void 0 : data.email, contactHTML);
    // console.log(
    //   '🚀 ~ file: contact.service.ts:24 ~ insertIntoDB ~ sendMail:',
    //   sendMail
    // )
    if (sendMail === null || sendMail === void 0 ? void 0 : sendMail.accepted) {
        const result = yield contact_model_1.Contact.create(data);
        return result;
    }
});
const getAllData = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contact_model_1.Contact.find({});
    return result;
});
const getSingleData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contact_model_1.Contact.findOne({ _id: id });
    return result;
});
const updateData = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contact_model_1.Contact.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contact_model_1.Contact.findOneAndDelete({ _id: id }).lean();
    return result;
});
exports.ContactService = {
    insertIntoDB,
    getAllData,
    getSingleData,
    updateData,
    deleteData,
};
