//import express from "express";
import { Application, NextFunction, Request, Response } from 'express'
import express from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import httpStatus from 'http-status'
import router from './app/routes'

const app: Application = express()
const port = 5000

//parse json
app.use(express.json())
//url encoded
app.use(express.urlencoded({ extended: true }))

app.use(cors())

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
