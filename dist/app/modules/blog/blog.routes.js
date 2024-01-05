"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
const router = express_1.default.Router();
router.get('/', blog_controller_1.BlogController.getAllData);
router.get('/:id', blog_controller_1.BlogController.getSingleData);
router.patch('/:id', blog_controller_1.BlogController.updateData);
router.delete('/:id', blog_controller_1.BlogController.deleteData);
router.post('/create-blog', blog_controller_1.BlogController.insertIntoDB);
exports.BlogRoutes = router;
