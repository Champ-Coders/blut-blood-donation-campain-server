"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("./review.controller");
const validateRequest_1 = require("../../middleware/validateRequest");
const review_validation_1 = require("./review.validation");
const router = express_1.default.Router();
router.get('/', review_controller_1.ReviewController.getAllData);
router.get('/:id', review_controller_1.ReviewController.getSingleData);
router.patch('/:id', (0, validateRequest_1.RequestValidation)(review_validation_1.ReviewValidation.update), review_controller_1.ReviewController.updateData);
router.delete('/:id', review_controller_1.ReviewController.deleteData);
router.post('/create-review', (0, validateRequest_1.RequestValidation)(review_validation_1.ReviewValidation.create), review_controller_1.ReviewController.insertIntoDB);
// get reviews by user id
router.get('/myReviews/:id', review_controller_1.ReviewController.getReviewsByUserId);
exports.ReviewRoutes = router;
