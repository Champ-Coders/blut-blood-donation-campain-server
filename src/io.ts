import { Server as SocketIoServer, Socket } from 'socket.io'
import http from 'http'

import { app } from './app'
import 'colors'

const server = http.createServer(app)
// Create HTTP server and attach Express app to it
const io: SocketIoServer = new SocketIoServer(server)

io.on('connection', (socket: Socket) => {
  console.log('socket user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})
