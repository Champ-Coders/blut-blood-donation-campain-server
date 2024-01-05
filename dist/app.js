"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.server = exports.port = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const http_status_1 = __importDefault(require("http-status"));
const routes_1 = __importDefault(require("./app/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const chat_service_1 = require("./app/modules/chat/chat.service");
const app = (0, express_1.default)();
exports.app = app;
const port = 5000;
exports.port = port;
//parse json
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
//url encoded
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:3000',
        'https://blut-blood-donation-compaign.vercel.app',
        'https://blut-blood-donation-main.onrender.com',
    ],
    credentials: true,
}));


//application  route
// Application Routes
app.use('/api/v1/', routes_1.default);
app.use('/', (req, res) => {
    res.status(http_status_1.default.OK).json({
        status: http_status_1.default.OK,
        message: 'The server is running',
    });
});
// Global error handler
app.use(globalErrorHandler_1.default);
const server = http_1.default.createServer(app);
exports.server = server;
// Create HTTP server and attach Express app to it;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
exports.io = io;
// Handle Not Found Route
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Route not found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'Api Not Found',
            },
        ],
    });
    next();
});
io.on('connection', (socket) => {
    console.log('socket user connected');
    ///! for create message used socket.emit("send-message",data) in frontend
    socket.on('send-message', data => {
        console.log(data);
        chat_service_1.chatService.createmessage(data);
        io.emit('update-message', data);
        // ! for sent message to frontend;
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
///! receiver email fixed   admin@admin.com
///!
