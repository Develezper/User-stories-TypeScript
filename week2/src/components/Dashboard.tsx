import {
  startTransition,
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useState,
  type FormEvent,
} from 'react'
import type { CreateUserInput, User } from '../interfaces/User'
import { userStore } from '../utils/UserStore'

interface DashboardProps {
  currentUser: User
  onLogout: () => void
}

type Notice = {
  tone: 'success' | 'info' | 'error'
  text: string
}

const initialForm: CreateUserInput = {
  fullName: '',
  email: '',
  password: '',
  isActive: true,
}

const dateFormatter = new Intl.DateTimeFormat('es-CO', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

function formatDate(timestamp: number) {
  return dateFormatter.format(timestamp)
}

export function Dashboard({ currentUser, onLogout }: DashboardProps) {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const [form, setForm] = useState<CreateUserInput>(initialForm)
  const [visibleUsers, setVisibleUsers] = useState<User[]>([])
  const [notice, setNotice] = useState<Notice>({
    tone: 'info',
    text: 'Abre la consola para revisar los logs HTTP simulados por cada operacion.',
  })

  const syncUsers = useEffectEvent((searchTerm: string) => {
    const normalizedQuery = searchTerm.trim()
    const nextUsers = normalizedQuery ? userStore.findByName(normalizedQuery) : userStore.list()

    startTransition(() => {
      setVisibleUsers(nextUsers)
    })
  })

  useEffect(() => {
    syncUsers(deferredQuery)
  }, [deferredQuery, syncUsers])

  const handleCreateUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedEmail = form.email.trim().toLowerCase()
    const duplicatedUser = userStore
      .list()
      .some((user) => user.email.toLowerCase() === normalizedEmail)

    if (duplicatedUser) {
      setNotice({
        tone: 'error',
        text: 'Ya existe un usuario con ese correo. Prueba con uno diferente.',
      })
      return
    }

    const createdUser = userStore.create({
      ...form,
      email: normalizedEmail,
      fullName: form.fullName.trim(),
      password: form.password.trim(),
    })

    setForm(initialForm)
    setNotice({
      tone: 'success',
      text: `Usuario creado con rol ${createdUser.role} y fecha ${formatDate(createdUser.createdAt)}.`,
    })
    syncUsers(query)
  }

  const handleToggleStatus = (user: User) => {
    const updatedUser = userStore.update(user.id, { isActive: !user.isActive })

    if (!updatedUser) {
      setNotice({
        tone: 'error',
        text: 'No fue posible actualizar el estado del usuario.',
      })
      return
    }

    setNotice({
      tone: 'success',
      text: `${updatedUser.fullName} ahora esta ${updatedUser.isActive ? 'activo' : 'inactivo'}.`,
    })
    syncUsers(query)
  }

  const handleRemove = (user: User) => {
    const removedUser = userStore.remove(user.id)

    if (!removedUser) {
      setNotice({
        tone: 'error',
        text: 'No fue posible eliminar el usuario seleccionado.',
      })
      return
    }

    setNotice({
      tone: 'success',
      text: `${removedUser.fullName} fue eliminado correctamente.`,
    })
    syncUsers(query)
  }

  const activeUsers = visibleUsers.filter((user) => user.isActive).length
  const adminUsers = visibleUsers.filter((user) => user.role === 'admin').length

  return (
    <section className="dashboard">
      <header className="dashboard__header">
        <div>
          <p className="dashboard__eyebrow">Vista principal</p>
          <h1>Panel de gestion de usuarios</h1>
          <p className="dashboard__copy">
            Sesion iniciada como <strong>{currentUser.fullName}</strong> ({currentUser.role}).
          </p>
        </div>

        <button className="ghost-button" onClick={onLogout} type="button">
          Cerrar sesion
        </button>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <span>Total visible</span>
          <strong>{visibleUsers.length}</strong>
        </article>
        <article className="stat-card">
          <span>Usuarios activos</span>
          <strong>{activeUsers}</strong>
        </article>
        <article className="stat-card">
          <span>Admins visibles</span>
          <strong>{adminUsers}</strong>
        </article>
      </section>

      <section className="dashboard__content">
        <article className="panel-card">
          <div className="panel-card__header">
            <p className="panel-card__eyebrow">TASK 2 + TASK 3</p>
            <h2>Crear usuario</h2>
          </div>

          <form className="create-form" onSubmit={handleCreateUser}>
            <label className="field">
              <span>Nombre completo</span>
              <input
                name="fullName"
                onChange={(event) =>
                  setForm((currentForm) => ({ ...currentForm, fullName: event.target.value }))
                }
                placeholder="Ej. Camila Osorio"
                required
                value={form.fullName}
              />
            </label>

            <label className="field">
              <span>Correo</span>
              <input
                name="email"
                onChange={(event) =>
                  setForm((currentForm) => ({ ...currentForm, email: event.target.value }))
                }
                placeholder="camila@riwi.dev"
                required
                type="email"
                value={form.email}
              />
            </label>

            <label className="field">
              <span>Contrasena</span>
              <input
                name="password"
                onChange={(event) =>
                  setForm((currentForm) => ({ ...currentForm, password: event.target.value }))
                }
                placeholder="Minimo una clave mock"
                required
                type="password"
                value={form.password}
              />
            </label>

            <label className="checkbox-field">
              <input
                checked={form.isActive}
                name="isActive"
                onChange={(event) =>
                  setForm((currentForm) => ({ ...currentForm, isActive: event.target.checked }))
                }
                type="checkbox"
              />
              <span>Crear usuario activo</span>
            </label>

            <button className="primary-button" type="submit">
              Crear y decorar usuario
            </button>
          </form>

          <p className={`notice notice--${notice.tone}`}>{notice.text}</p>
        </article>

        <article className="panel-card">
          <div className="panel-card__header">
            <p className="panel-card__eyebrow">Busqueda</p>
            <h2>Listar y filtrar por nombre</h2>
          </div>

          <label className="field">
            <span>Buscar usuario</span>
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Escribe un nombre para usar findByName()"
              value={query}
            />
          </label>

          <div className="user-list">
            {visibleUsers.map((user) => (
              <article className="user-item" key={user.id}>
                <div className="user-item__body">
                  <div className="user-item__title-row">
                    <h3>{user.fullName}</h3>
                    <span className={`pill pill--${user.isActive ? 'active' : 'inactive'}`}>
                      {user.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>

                  <p>{user.email}</p>
                  <p>Rol: {user.role}</p>
                  <p>Creado: {formatDate(user.createdAt)}</p>
                </div>

                <div className="user-item__actions">
                  <button
                    className="ghost-button"
                    onClick={() => handleToggleStatus(user)}
                    type="button"
                  >
                    {user.isActive ? 'Desactivar' : 'Activar'}
                  </button>
                  <button className="danger-button" onClick={() => handleRemove(user)} type="button">
                    Eliminar
                  </button>
                </div>
              </article>
            ))}

            {visibleUsers.length === 0 ? (
              <div className="empty-state">
                No hay resultados para la busqueda actual. Ajusta el filtro o crea un usuario nuevo.
              </div>
            ) : null}
          </div>
        </article>
      </section>
    </section>
  )
}
