import { users } from '../data/users'
import type { User } from '../interfaces/User'

export type AuthenticationResult =
  | {
      success: true
      message: string
      user: User
    }
  | {
      success: false
      message: string
      user: null
    }

export function authenticate(email: string, password: string): AuthenticationResult {
  const normalizedEmail = email.trim().toLowerCase()

  const matchedUser = users.find(
    (user) => user.email.toLowerCase() === normalizedEmail && user.password === password,
  )

  if (!matchedUser) {
    return {
      success: false,
      message: 'Credenciales incorrectas. Verifica el correo y la contrasena.',
      user: null,
    }
  }

  if (!matchedUser.isActive) {
    return {
      success: false,
      message: 'El usuario existe, pero esta inactivo. Activalo antes de ingresar.',
      user: null,
    }
  }

  return {
    success: true,
    message: `Bienvenido, ${matchedUser.fullName}. Redirigiendo al panel principal...`,
    user: matchedUser,
  }
}
