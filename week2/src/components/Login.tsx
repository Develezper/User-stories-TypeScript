import { useEffect, useEffectEvent, useRef, useState, type FormEvent } from 'react'
import { users } from '../data/users'
import type { User } from '../interfaces/User'
import { authenticate } from '../utils/auth'

interface LoginProps {
  onLoginSuccess: (user: User) => void
}

type Notice = {
  tone: 'success' | 'error' | 'info'
  text: string
}

const initialNotice: Notice = {
  tone: 'info',
  text: 'Usa una de las cuentas mock para validar la autenticacion modular.',
}

export function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('ana.torres@riwi.dev')
  const [password, setPassword] = useState('Admin123*')
  const [notice, setNotice] = useState<Notice>(initialNotice)
  const redirectTimerRef = useRef<number | null>(null)
  const commitLogin = useEffectEvent((user: User) => onLoginSuccess(user))

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) {
        window.clearTimeout(redirectTimerRef.current)
      }
    }
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (redirectTimerRef.current) {
      window.clearTimeout(redirectTimerRef.current)
    }

    const result = authenticate(email, password)

    setNotice({
      tone: result.success ? 'success' : 'error',
      text: result.message,
    })

    if (!result.success) {
      return
    }

    redirectTimerRef.current = window.setTimeout(() => {
      commitLogin(result.user)
    }, 700)
  }

  return (
    <section className="login-view">
      <article className="hero-card">
        <h1>Autenticacion modular, CRUD y decoradores en React + TypeScript</h1>
        <p className="hero-card__copy">
          El login consume un modulo independiente de autenticacion y, tras ingresar, redirige a un
          panel para gestionar usuarios con una clase `UserStore`.
        </p>

        <div className="credential-list">
          {users.map((user) => (
            <button
              className="credential-card"
              key={user.id}
              type="button"
              onClick={() => {
                setEmail(user.email)
                setPassword(user.password)
                setNotice({
                  tone: 'info',
                  text: `Credenciales de ${user.fullName} cargadas en el formulario.`,
                })
              }}
            >
              <span className={`status-dot ${user.isActive ? 'status-dot--active' : 'status-dot--inactive'}`} />
              <strong>{user.fullName}</strong>
              <span>{user.email}</span>
              <span>Clave: {user.password}</span>
              <span>{user.isActive ? 'Cuenta activa' : 'Cuenta inactiva'}</span>
            </button>
          ))}
        </div>
      </article>

      <article className="login-panel">
        <div className="login-panel__header">
          <p className="login-panel__eyebrow">TASK 1</p>
          <h2>Iniciar sesion</h2>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Correo</span>
            <input
              autoComplete="email"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="correo@riwi.dev"
              required
              type="email"
              value={email}
            />
          </label>

          <label className="field">
            <span>Contrasena</span>
            <input
              autoComplete="current-password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Ingresa tu contrasena"
              required
              type="password"
              value={password}
            />
          </label>

          <button className="primary-button" type="submit">
            Validar credenciales
          </button>
        </form>

        <p className={`notice notice--${notice.tone}`}>{notice.text}</p>
      </article>
    </section>
  )
}
