import { Types } from 'mongoose'
import { IGenericErrorMessage } from './error'

export type IGenericErrorResponse = {
  statusCode: number
  success: boolean
  message: string
  errorMessages: IGenericErrorMessage[]
}

// Pagination Response
export type IGenericResponse<T> = {
  meta: {
    page: number
    limit: number
    total: number
  }
  data: T
}

export type UserInfoFromToken = {
  _id: Types.ObjectId
  email: string
  iat: number
  exp: number
}

export type IPaginationOptions = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
