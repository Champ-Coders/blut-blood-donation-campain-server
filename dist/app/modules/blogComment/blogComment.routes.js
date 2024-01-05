"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogCommentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const blogComment_controller_1 = require("./blogComment.controller");
const router = express_1.default.Router();
router.post('/', blogComment_controller_1.BlogCommentController.insertIntoDB);
router.get('/', blogComment_controller_1.BlogCommentController.getAllData);
router.get('/:id', blogComment_controller_1.BlogCommentController.getSingleData);
router.patch('/:id', blogComment_controller_1.BlogCommentController.updateData);
router.delete('/:id', blogComment_controller_1.BlogCommentController.deleteData);
// get comments by user id
router.get('/myComments/:id', blogComment_controller_1.BlogCommentController.getCommentsByUserId);
exports.BlogCommentRoutes = router;
