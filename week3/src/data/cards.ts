import type { ButtonVariant } from '../components/Button'
import type { CardBadge, CardType } from '../components/Card'

export type CardId = 'ops-dashboard' | 'risk-alerts' | 'campaign-recap' | 'sync-state'
export type CardState = 'pending' | 'attention' | 'reviewing' | 'ready' | 'shared' | 'done'
export type CardBucket = 'attention' | 'active' | 'done'

export interface CardAction {
  type: 'instant' | 'timed'
  nextState: CardState
  completedMessage: string
  pendingMessage?: string
  delayMs?: number
}

export interface CardView {
  title: string
  description: string
  badges: CardBadge[]
  buttonText: string
  buttonVariant: ButtonVariant
  buttonDisabled?: boolean
  bucket: CardBucket
  action?: CardAction
}

export interface CardExample {
  id: CardId
  type: CardType
  imageUrl?: string
  initialState: CardState
  states: Partial<Record<CardState, CardView>>
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
    type: 'white',
    imageUrl: createCover('Sprint en curso', '#F8FBF4', '#7BB661', '#183121'),
    initialState: 'pending',
    states: {
      pending: {
        title: 'Seguimiento de entregas',
        description: 'Revisa el avance de la semana y confirma que todo este marchando como esperas.',
        badges: [
          { label: 'Pendiente', status: 'info' },
          { label: 'Esta semana', status: 'neutral' },
        ],
        buttonText: 'Marcar revision',
        buttonVariant: 'primary',
        bucket: 'active',
        action: {
          type: 'instant',
          nextState: 'done',
          completedMessage: 'La revision de entregas ya quedo completada.',
        },
      },
      done: {
        title: 'Seguimiento de entregas',
        description: 'La revision de esta semana ya quedo lista y el equipo puede continuar.',
        badges: [
          { label: 'Revisado', status: 'success' },
          { label: 'Esta semana', status: 'neutral' },
        ],
        buttonText: 'Revisado',
        buttonVariant: 'secondary',
        buttonDisabled: true,
        bucket: 'done',
      },
    },
  },
  {
    id: 'risk-alerts',
    type: 'black',
    imageUrl: createCover('Atencion inmediata', '#101912', '#E86957', '#F7FFF3'),
    initialState: 'attention',
    states: {
      attention: {
        title: 'Alertas de pago',
        description: 'Atiendes primero los casos mas delicados para evitar retrasos en el cierre.',
        badges: [
          { label: 'Urgente', status: 'error' },
          { label: 'Riesgo alto', status: 'warning' },
        ],
        buttonText: 'Tomar revision',
        buttonVariant: 'danger',
        bucket: 'attention',
        action: {
          type: 'timed',
          nextState: 'reviewing',
          pendingMessage: 'Estamos preparando los casos prioritarios para revisarlos con calma.',
          completedMessage: 'Las alertas ya quedaron listas para revision.',
          delayMs: 1300,
        },
      },
      reviewing: {
        title: 'Alertas de pago',
        description: 'Los casos urgentes ya quedaron agrupados y solo falta cerrar la revision.',
        badges: [
          { label: 'En revision', status: 'info' },
          { label: '4 casos', status: 'neutral' },
        ],
        buttonText: 'Marcar resuelto',
        buttonVariant: 'secondary',
        bucket: 'active',
        action: {
          type: 'instant',
          nextState: 'done',
          completedMessage: 'Las alertas de pago ya quedaron resueltas.',
        },
      },
      done: {
        title: 'Alertas de pago',
        description: 'Las alertas prioritarias de hoy ya fueron atendidas.',
        badges: [
          { label: 'Resuelto', status: 'success' },
          { label: 'Sin pendientes', status: 'neutral' },
        ],
        buttonText: 'Resuelto',
        buttonVariant: 'secondary',
        buttonDisabled: true,
        bucket: 'done',
      },
    },
  },
  {
    id: 'campaign-recap',
    type: 'green',
    imageUrl: createCover('Resultado listo', '#E8F7DE', '#2A9D62', '#1C351F'),
    initialState: 'ready',
    states: {
      ready: {
        title: 'Campana sostenible',
        description: 'El resumen esta listo para enviarse al equipo o presentarse a cliente.',
        badges: [
          { label: 'Listo para compartir', status: 'info' },
          { label: 'Marketing', status: 'neutral' },
        ],
        buttonText: 'Compartir resumen',
        buttonVariant: 'secondary',
        bucket: 'active',
        action: {
          type: 'instant',
          nextState: 'shared',
          completedMessage: 'El resumen de la campana ya fue compartido.',
        },
      },
      shared: {
        title: 'Campana sostenible',
        description: 'El resumen ya fue compartido y el equipo puede consultarlo cuando lo necesite.',
        badges: [
          { label: 'Compartido', status: 'success' },
          { label: 'Marketing', status: 'neutral' },
        ],
        buttonText: 'Compartido',
        buttonVariant: 'secondary',
        buttonDisabled: true,
        bucket: 'done',
      },
    },
  },
  {
    id: 'sync-state',
    type: 'white',
    imageUrl: createCover('Automatizacion activa', '#F5F9FF', '#4A7EF0', '#17304F'),
    initialState: 'pending',
    states: {
      pending: {
        title: 'Actualiza tu catalogo',
        description: 'Lanza la actualizacion cuando quieras y sigue trabajando mientras el proceso termina.',
        badges: [
          { label: 'Pendiente', status: 'info' },
          { label: 'Catalogo', status: 'neutral' },
        ],
        buttonText: 'Actualizar ahora',
        buttonVariant: 'primary',
        bucket: 'active',
        action: {
          type: 'timed',
          nextState: 'done',
          pendingMessage: 'Estamos actualizando tu catalogo. Puedes seguir aqui mientras termina.',
          completedMessage: 'Tu catalogo ya quedo actualizado.',
          delayMs: 1800,
        },
      },
      done: {
        title: 'Catalogo actualizado',
        description: 'Los cambios mas recientes ya quedaron aplicados y no hace falta esperar mas.',
        badges: [
          { label: 'Actualizado', status: 'success' },
          { label: 'Catalogo', status: 'neutral' },
        ],
        buttonText: 'Actualizado',
        buttonVariant: 'secondary',
        buttonDisabled: true,
        bucket: 'done',
      },
    },
  },
]
