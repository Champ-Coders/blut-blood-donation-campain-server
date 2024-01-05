"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const banner_controller_1 = require("./banner.controller");
const router = express_1.default.Router();
router.get('/', banner_controller_1.BannerController.getAllData);
router.get('/:id', banner_controller_1.BannerController.getSingleData);
router.patch('/:id', banner_controller_1.BannerController.updateData);
router.delete('/:id', banner_controller_1.BannerController.deleteData);
router.post('/create-banner', banner_controller_1.BannerController.insertIntoDB);
exports.BannerRoutes = router;
