"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VolunteersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const volunteers_controller_1 = require("./volunteers.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = require("../../middleware/validateRequest");
const volunteers_validation_1 = require("./volunteers.validation");
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.get('/', volunteers_controller_1.VolunteersController.getAllData);
router.get('/:id', volunteers_controller_1.VolunteersController.getSingleData);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.RequestValidation)(volunteers_validation_1.VolunteersValidation.update), volunteers_controller_1.VolunteersController.updateData);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), volunteers_controller_1.VolunteersController.deleteData);
router.post('/create-volunteer', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.RequestValidation)(volunteers_validation_1.VolunteersValidation.create), volunteers_controller_1.VolunteersController.insertIntoDB);
exports.VolunteersRoutes = router;
