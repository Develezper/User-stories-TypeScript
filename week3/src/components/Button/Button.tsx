import type { MouseEventHandler, ReactNode } from 'react'
import './Button.css'

export type ButtonVariant = 'primary' | 'secondary' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

/**
 * API publica del boton reutilizable.
 */
export interface ButtonProps {
  text: string
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Button = ({
  text,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  onClick,
}: ButtonProps) => {
  // Mientras se carga, el componente se protege contra clicks accidentales.
  const isDisabled = disabled || loading

  return (
    <button
      className={`ui-button ui-button--${variant} ui-button--${size}`}
      disabled={isDisabled}
      aria-busy={loading}
      onClick={onClick}
      type="button"
    >
      {loading ? <span className="ui-button__spinner" aria-hidden="true" /> : leftIcon}
      <span>{loading ? 'Cargando...' : text}</span>
      {!loading ? rightIcon : null}
    </button>
  )
}
