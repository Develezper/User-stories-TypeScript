import type { CardBadge, CardType } from '../components/Card'
import type { ButtonSize, ButtonVariant } from '../components/Button'

export interface CardExample {
  id: string
  title: string
  description: string
  type: CardType
  imageUrl?: string
  badges: CardBadge[]
  buttonText: string
  buttonVariant: ButtonVariant
  buttonSize?: ButtonSize
  buttonDisabled?: boolean
  buttonLoading?: boolean
}

const createCover = (eyebrow: string, background: string, accent: string, textColor: string) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg width="960" height="540" viewBox="0 0 960 540" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="960" height="540" rx="42" fill="${background}" />
      <circle cx="760" cy="140" r="120" fill="${accent}" fill-opacity="0.28" />
      <circle cx="180" cy="400" r="160" fill="${accent}" fill-opacity="0.18" />
      <rect x="72" y="82" width="228" height="46" rx="23" fill="${accent}" fill-opacity="0.16" />
      <text x="92" y="112" fill="${textColor}" font-family="Arial, sans-serif" font-size="20" font-weight="700">${eyebrow}</text>
      <text x="72" y="264" fill="${textColor}" font-family="Arial, sans-serif" font-size="78" font-weight="700">Reusable UI</text>
      <text x="72" y="330" fill="${textColor}" font-family="Arial, sans-serif" font-size="34" font-weight="400">Cards con Badge + Button integrados</text>
    </svg>
  `)}`

export const cardExamples: CardExample[] = [
  {
    id: 'ops-dashboard',
    title: 'Seguimiento de entregas',
    description:
      'Combina badges de estado y un boton principal para revisar el avance semanal del equipo de operaciones.',
    type: 'white',
    imageUrl: createCover('Sprint en curso', '#F8FBF4', '#7BB661', '#183121'),
    badges: [
      { label: 'En curso', status: 'info' },
      { label: 'Sprint 3', status: 'neutral' },
    ],
    buttonText: 'Ver tablero',
    buttonVariant: 'primary',
    buttonSize: 'md',
  },
  {
    id: 'risk-alerts',
    title: 'Alertas de pago',
    description:
      'Ejemplo de card oscura con accion destacada para abordar incidentes de cobro antes del cierre diario.',
    type: 'black',
    imageUrl: createCover('Atencion inmediata', '#101912', '#E86957', '#F7FFF3'),
    badges: [
      { label: 'Urgente', status: 'error' },
      { label: 'Riesgo alto', status: 'warning' },
    ],
    buttonText: 'Revisar casos',
    buttonVariant: 'danger',
    buttonSize: 'lg',
  },
  {
    id: 'campaign-recap',
    title: 'Campana sostenible',
    description:
      'La card verde usa un badge de exito y un boton secundario para resaltar resultados completados.',
    type: 'green',
    imageUrl: createCover('Resultado listo', '#E8F7DE', '#2A9D62', '#1C351F'),
    badges: [
      { label: 'Completado', status: 'success' },
      { label: 'Marketing', status: 'neutral' },
    ],
    buttonText: 'Compartir resumen',
    buttonVariant: 'secondary',
    buttonSize: 'sm',
  },
  {
    id: 'sync-state',
    title: 'Sincronizacion de catalogo',
    description:
      'Tambien se ilustra el estado loading del boton para procesos que ya se encuentran ejecutandose.',
    type: 'white',
    imageUrl: createCover('Automatizacion activa', '#F5F9FF', '#4A7EF0', '#17304F'),
    badges: [
      { label: 'Procesando', status: 'info' },
      { label: 'Sincronia', status: 'neutral' },
    ],
    buttonText: 'Sincronizando',
    buttonVariant: 'primary',
    buttonSize: 'md',
    buttonLoading: true,
  },
]
