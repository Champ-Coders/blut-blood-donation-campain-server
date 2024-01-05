"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiveRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = require("../../middleware/validateRequest");
const receive_controller_1 = require("./receive.controller");
const receive_validation_1 = require("./receive.validation");
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router
    .route('/')
    .post((0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.RequestValidation)(receive_validation_1.ReceiveValidation.receiveZodSchema), receive_controller_1.ReceiveController.request)
    .get((0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), receive_controller_1.ReceiveController.getAllData);
exports.ReceiveRoutes = router;
