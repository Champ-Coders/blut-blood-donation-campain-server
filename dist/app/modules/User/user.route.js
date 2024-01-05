"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = require("../../middleware/validateRequest");
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/registration', (0, validateRequest_1.RequestValidation)(user_validation_1.UserValidation.createUserZodSchema), user_controller_1.UserController.createUser);
router.post('/login', (0, validateRequest_1.RequestValidation)(user_validation_1.UserValidation.loginUserZodSchema), user_controller_1.UserController.loginUser);
router.get('/profile', (0, auth_1.default)(), user_controller_1.UserController.myProfile);
router.patch('/profile', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.RequestValidation)(user_validation_1.UserValidation.updateUserZodSchema), user_controller_1.UserController.updateProfile);
router.patch('/change-password', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.RequestValidation)(user_validation_1.UserValidation.changePasswordZodSchema), user_controller_1.UserController.changePassword);
router.post('/refresh-token', (0, validateRequest_1.RequestValidation)(user_validation_1.UserValidation.refreshTokenZodSchema), user_controller_1.UserController.refreshToken);
router.get('/all-users', user_controller_1.UserController.getAllUsers);
router.get('/all-individual-group/:group', user_controller_1.UserController.getIndividualGroupUsers);
router.get('/single-user/:id', user_controller_1.UserController.getSingleUser);
router.post('/forget-password', user_controller_1.UserController.forgetPassword);
router.post('/reset-password/:id/:token', user_controller_1.UserController.resetPassword);
router.patch('/profile/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.RequestValidation)(user_validation_1.UserValidation.updateUserZodSchema), user_controller_1.UserController.updateProfileByAdmin);
router.patch('/change-role/:id', 
// RequestValidation(UserValidation.changeRoleZodSchema),
(0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.changeRole);
router.delete('/profile/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.deleteProfileByAdmin);
exports.userRoutes = router;
