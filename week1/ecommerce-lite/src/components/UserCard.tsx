import type { User } from '../interfaces/User'

export interface UserCardProps {
  user: User
}

const roleLabelMap: Record<User['role'], string> = {
  admin: 'Administrador',
  customer: 'Cliente',
  support: 'Soporte',
}

export function UserCard({ user }: UserCardProps) {
  const statusClass = user.isActive ? 'pill pill--active' : 'pill pill--inactive'

  return (
    <article className="user-card">
      <div className="user-card__top">
        <h3>{user.fullName}</h3>
        <span className={statusClass}>{user.isActive ? 'Activo' : 'Inactivo'}</span>
      </div>
      <p className="user-card__email">{user.email}</p>
      <p className="user-card__meta">Rol: {roleLabelMap[user.role]}</p>
    </article>
  )
}
