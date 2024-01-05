//import express from "express";
import { Application, NextFunction, Request, Response } from 'express'
import express from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import httpStatus from 'http-status'
import router from './app/routes'
import cookieParser from 'cookie-parser'
import { Server as SocketIoServer } from 'socket.io'
import http from 'http'

import { initializeSocketConnection } from './io'

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

// Separate socket connection logic
initializeSocketConnection(io);

export { app, port, server, io }


