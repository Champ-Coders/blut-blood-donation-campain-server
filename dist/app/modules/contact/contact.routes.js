"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_1 = require("../../../enums/user");
const contact_controller_1 = require("./contact.controller");
const contact_validation_1 = require("./contact.validation");
const router = express_1.default.Router();
router
    .route('/')
    .post((0, validateRequest_1.RequestValidation)(contact_validation_1.ContactValidation.create), contact_controller_1.ContactController.insertIntoDB)
    .get(contact_controller_1.ContactController.getAllData);
// router.get('/', ContactController.getAllData)
router.get('/:id', contact_controller_1.ContactController.getSingleData);
router.patch('/:id', (0, validateRequest_1.RequestValidation)(contact_validation_1.ContactValidation.update), contact_controller_1.ContactController.updateData);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), contact_controller_1.ContactController.deleteData);
// router.post(
//   '/create-Contact',
//   RequestValidation(ContactValidation.create),
//   ContactController.insertIntoDB
// )
exports.ContactRoutes = router;
