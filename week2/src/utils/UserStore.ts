import { users } from '../data/users'
import type { CreateUserInput, UpdateUserInput, User } from '../interfaces/User'
import { enrichNewUser } from './decorators'

type EnrichedCreateInput = CreateUserInput & Pick<User, 'role' | 'createdAt'>

export class UserStore {
  constructor(private readonly source: User[] = users) {}

  private log(method: 'GET' | 'POST' | 'PATCH' | 'DELETE', endpoint: string, payload?: unknown) {
    const prefix = `[HTTP ${method}] ${endpoint}`

    if (payload !== undefined) {
      console.log(prefix, payload)
      return
    }

    console.log(prefix)
  }

  private getNextId() {
    const nextNumber =
      this.source.reduce((maxId, user) => {
        const numericId = Number(user.id.replace('USR-', ''))
        return Number.isNaN(numericId) ? maxId : Math.max(maxId, numericId)
      }, 0) + 1

    return `USR-${String(nextNumber).padStart(3, '0')}`
  }

  list() {
    this.log('GET', '/users')
    return [...this.source]
  }

  findByName(name: string) {
    this.log('GET', `/users?fullName_like=${encodeURIComponent(name)}`)

    const query = name.trim().toLowerCase()
    if (!query) {
      return this.list()
    }

    return this.source.filter((user) => user.fullName.toLowerCase().includes(query))
  }

  @enrichNewUser
  create(input: CreateUserInput) {
    this.log('POST', '/users', input)

    const enrichedInput = input as EnrichedCreateInput
    const newUser: User = {
      id: this.getNextId(),
      ...enrichedInput,
    }

    this.source.push(newUser)
    return newUser
  }

  update(id: string, updates: UpdateUserInput) {
    this.log('PATCH', `/users/${id}`, updates)

    const userIndex = this.source.findIndex((user) => user.id === id)
    if (userIndex === -1) {
      return null
    }

    const updatedUser: User = {
      ...this.source[userIndex],
      ...updates,
    }

    this.source[userIndex] = updatedUser
    return updatedUser
  }

  remove(id: string) {
    this.log('DELETE', `/users/${id}`)

    const userIndex = this.source.findIndex((user) => user.id === id)
    if (userIndex === -1) {
      return null
    }

    const [removedUser] = this.source.splice(userIndex, 1)
    return removedUser
  }
}

export const userStore = new UserStore()
