"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRoutes = void 0;
const express_1 = __importDefault(require("express"));
const event_controller_1 = require("./event.controller");
const validateRequest_1 = require("../../middleware/validateRequest");
const event_validation_1 = require("./event.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.route('/').get(event_controller_1.EventController.getAllData).post((0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.RequestValidation)(event_validation_1.EventValidation.create), event_controller_1.EventController.insertIntoDB);
router
    .route('/:id')
    .get(event_controller_1.EventController.getSingleData)
    .patch((0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.RequestValidation)(event_validation_1.EventValidation.update), event_controller_1.EventController.updateData)
    .delete((0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), event_controller_1.EventController.deleteData);
exports.EventRoutes = router;
