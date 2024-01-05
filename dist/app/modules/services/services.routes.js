"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const services_controller_1 = require("./services.controller");
const router = express_1.default.Router();
router.get('/', services_controller_1.ServicesController.getAllData);
router.get('/:id', services_controller_1.ServicesController.getSingleData);
router.patch('/:id', services_controller_1.ServicesController.updateData);
router.delete('/:id', services_controller_1.ServicesController.deleteData);
router.post('/create-services', services_controller_1.ServicesController.insertIntoDB);
exports.ServicesRoutes = router;
