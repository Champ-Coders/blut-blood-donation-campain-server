export type ILoginUser = {
  email: string
  password: string
}

export type IRefreshTokenResponse = {
  accessToken: string
}

export type IChangePassword = {
  oldPassword: string
  newPassword: string
}

export const userFilterableField = [
  'searchTerm',
  'available',
  'name',
  'email',
  'phoneNumber',
  'bloodGroup',
  'address',
]

export type IUserFilters = {
  searchTerm?: string
  bloodGroup?: string
}
export type Role = 'admin' | 'user'

export const userRoles: Role[] = ['admin', 'user']
