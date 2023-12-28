//import express from "express";
import { Application, NextFunction, Request, Response } from 'express'
import express from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import httpStatus from 'http-status'
import router from './app/routes'
import cookieParser from 'cookie-parser'

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
      'https://redirect-blood-donation-campain-server.vercel.app',
    ],
    credentials: true,
  })
)

//application  route
// Application Routes
app.use('/api/v1/', router)

// Global error handler
app.use(globalErrorHandler)

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

export { app, port }
