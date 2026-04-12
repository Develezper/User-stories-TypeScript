import type { ReactNode } from 'react'
import { Badge, type BadgeProps } from '../Badge'
import './Card.css'

export type CardType = 'green' | 'white' | 'black'

export type CardBadge = Pick<BadgeProps, 'label' | 'status' | 'icon'>

/**
 * Card compuesta que garantiza la presencia de al menos un badge visual.
 */
export interface CardProps {
  title: string
  type: CardType
  imageUrl?: string
  footer?: ReactNode
  badges?: CardBadge[]
  children?: ReactNode
}

export const Card = ({ title, type, imageUrl, footer, badges, children }: CardProps) => {
  // Si no se reciben badges, la card sigue respetando el criterio de integrar al menos uno.
  const resolvedBadges = badges?.length ? badges : [{ label: 'General', status: 'neutral' as const }]

  return (
    <article className={`ui-card ui-card--${type}`}>
      {imageUrl ? (
        <div className="ui-card__media">
          <img src={imageUrl} alt={title} />
        </div>
      ) : null}

      <div className="ui-card__content">
        <div className="ui-card__badges">
          {resolvedBadges.map((badge) => (
            <Badge
              key={`${badge.label}-${badge.status ?? 'neutral'}`}
              label={badge.label}
              status={badge.status}
              icon={badge.icon}
            />
          ))}
        </div>

        <h2>{title}</h2>
        <div className="ui-card__body">{children}</div>

        {footer ? <div className="ui-card__footer">{footer}</div> : null}
      </div>
    </article>
  )
}
