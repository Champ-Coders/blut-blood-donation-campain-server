//import express from "express";
import { Application, NextFunction, Request, Response } from 'express'
import express from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import httpStatus from 'http-status'
import router from './app/routes'
import cookieParser from 'cookie-parser'
import { Server as SocketIoServer, Socket } from 'socket.io'
import http from 'http'
import { chatService } from './app/modules/chat/chat.service'

const app: Application = express()
const port = 5000

//parse json
app.use(express.json())

app.use(cookieParser())

//url encoded
app.use(express.urlencoded({ extended: true }))

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://blut-blood-donation-compaign.vercel.app',
    ],
    credentials: true,
  })
)

//application  route
// Application Routes
app.use('/api/v1/', router)

app.use('/', (req, res) => {
  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    message: 'The server is running',
  })
})
// Global error handler
app.use(globalErrorHandler)

const server = http.createServer(app)
// Create HTTP server and attach Express app to it;

const io: SocketIoServer = new SocketIoServer(server, {
  cors: {
    origin: '*', // Add your frontend origin here
    methods: ['GET', 'POST'],
  },
})

// Handle Not Found Route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Route not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api Not Found',
      },
    ],
  })

  next()
})

io.on('connection', (socket: Socket) => {
  console.log('socket user connected')

  const userString = socket.handshake.query.user as string
  const user = JSON.parse(userString)

  // Now, you can use the 'user' object as needed
  console.log('User:', user)

  ///! for create message used socket.emit("send-message",data) in frontend
  socket.on('send-message', data => {
    // console.log(data)
    chatService.createmessage(data)

    // ! for sent message to frontend;

    const allMessage = chatService.getMessage(user?.email)
    console.log('🚀 ~ file: app.ts:90 ~ io.on ~ allMessage:', allMessage)

    io.emit('allMessage', allMessage)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

// server.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

export { app, port, server, io }
