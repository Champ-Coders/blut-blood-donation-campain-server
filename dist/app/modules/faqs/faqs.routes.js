"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const faqs_controller_1 = require("./faqs.controller");
const router = express_1.default.Router();
router.get('/', faqs_controller_1.FaqsController.getAllData);
router.get('/:id', faqs_controller_1.FaqsController.getSingleData);
router.patch('/:id', faqs_controller_1.FaqsController.updateData);
router.delete('/:id', faqs_controller_1.FaqsController.deleteData);
router.post('/create-faqs', faqs_controller_1.FaqsController.insertIntoDB);
exports.FaqsRoutes = router;
