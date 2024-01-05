import { Socket, Server as SocketIoServer } from 'socket.io';
import { chatService } from './app/modules/chat/chat.service';

export const initializeSocketConnection = (io: SocketIoServer) => {
  io.on('connection', (socket: Socket) => {
    console.log('socket user connected');

    ///! for create message used socket.emit("send-message",data) in frontend
    socket.on('send-message', (data) => {
      console.log(data);
      chatService.createmessage(data);
      io.emit('update-message', data);
      // ! for sent message to frontend;
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};
