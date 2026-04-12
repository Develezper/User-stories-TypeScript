export type UserRole = 'admin' | 'user'

export interface User {
  id: string
  fullName: string
  email: string
  password: string
  isActive: boolean
  role: UserRole
  createdAt: number
}

export type CreateUserInput = Pick<User, 'fullName' | 'email' | 'password' | 'isActive'>

export type UpdateUserInput = Partial<Pick<User, 'fullName' | 'email' | 'password' | 'isActive'>>
