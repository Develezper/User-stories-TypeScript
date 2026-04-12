import type { ReactNode } from 'react'
import './Badge.css'

export type BadgeStatus = 'success' | 'warning' | 'info' | 'error' | 'neutral'

/**
 * Badge para estados, categorias o prioridades.
 */
export interface BadgeProps {
  label: string
  status?: BadgeStatus
  icon?: ReactNode
}

export const Badge = ({ label, status = 'neutral', icon }: BadgeProps) => (
  <span className={`ui-badge ui-badge--${status}`}>
    {icon ? <span className="ui-badge__icon">{icon}</span> : null}
    <span>{label}</span>
  </span>
)
