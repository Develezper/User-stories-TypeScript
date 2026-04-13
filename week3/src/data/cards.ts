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
      <text x="72" y="264" fill="${textColor}" font-family="Arial, sans-serif" font-size="78" font-weight="700">Vista clara</text>
      <text x="72" y="330" fill="${textColor}" font-family="Arial, sans-serif" font-size="34" font-weight="400">Acciones rapidas para tu dia</text>
    </svg>
  `)}`

export const cardExamples: CardExample[] = [
  {
    id: 'ops-dashboard',
    title: 'Seguimiento de entregas',
    description:
      'Consulta en segundos como va el avance del equipo y entra directo al tablero principal.',
    type: 'white',
    imageUrl: createCover('Sprint en curso', '#F8FBF4', '#7BB661', '#183121'),
    badges: [
      { label: 'En curso', status: 'info' },
      { label: 'Esta semana', status: 'neutral' },
    ],
    buttonText: 'Ver tablero',
    buttonVariant: 'primary',
    buttonSize: 'md',
  },
  {
    id: 'risk-alerts',
    title: 'Alertas de pago',
    description:
      'Encuentra los casos mas delicados del dia y atiendelos antes de que se acumulen.',
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
      'Mira los resultados listos para compartir con el equipo o presentar a cliente.',
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
    title: 'Tu catalogo se esta actualizando',
    description:
      'Todo sigue avanzando en segundo plano mientras tu puedes continuar con tranquilidad.',
    type: 'white',
    imageUrl: createCover('Automatizacion activa', '#F5F9FF', '#4A7EF0', '#17304F'),
    badges: [
      { label: 'En progreso', status: 'info' },
      { label: 'Catalogo', status: 'neutral' },
    ],
    buttonText: 'Actualizar ahora',
    buttonVariant: 'primary',
    buttonSize: 'md',
  },
]
