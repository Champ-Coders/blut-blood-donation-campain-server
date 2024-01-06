"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocketConnection = void 0;
const chat_service_1 = require("./app/modules/chat/chat.service");
const initializeSocketConnection = (io) => {
    io.on('connection', (socket) => {
        console.log('socket user connected');
        ///! for create message used socket.emit("send-message",data) in frontend
        socket.on('send-message', (data) => {
            console.log(data);
            chat_service_1.chatService.createmessage(data);
            io.emit('update-message', data);
            // ! for sent message to frontend;
        });
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
};
exports.initializeSocketConnection = initializeSocketConnection;
