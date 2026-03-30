import type { Address } from './Address'

export type UserRole = 'admin' | 'customer' | 'support'

export interface User {
  id: string
  fullName: string
  email: string
  isActive: boolean
  role: UserRole
  address: Address
  createdAt: string
}
