import { useState, type ReactNode } from 'react'
import './App.css'
import { Button, Card, type BadgeStatus } from './components'
import { cardExamples } from './data/cards'

const ArrowIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path
      d="M5 12h14m-6-6 6 6-6 6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  </svg>
)

const SparkIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path
      d="m12 3 1.8 4.7L18.5 9l-4.7 1.3L12 15l-1.8-4.7L5.5 9l4.7-1.3L12 3Z"
      fill="currentColor"
    />
  </svg>
)

const TrendIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path
      d="m4 16 5-5 4 4 7-7"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
    <path
      d="M16 8h4v4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  </svg>
)

const AlertIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path
      d="M12 8v4m0 4h.01M10.2 3.8 2.9 17a2 2 0 0 0 1.7 3h14.8a2 2 0 0 0 1.7-3L13.8 3.8a2 2 0 0 0-3.6 0Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  </svg>
)

const LayersIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path
      d="m12 4 8 4-8 4-8-4 8-4Zm8 8-8 4-8-4m16 4-8 4-8-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  </svg>
)

const badgeIcons: Record<BadgeStatus, ReactNode> = {
  success: <TrendIcon />,
  warning: <AlertIcon />,
  info: <SparkIcon />,
  error: <AlertIcon />,
  neutral: <LayersIcon />,
}

type ViewFilter = 'all' | 'attention' | 'active' | 'done'

const filterOptions: { id: ViewFilter; label: string; helper: string }[] = [
  { id: 'all', label: 'Todo', helper: 'Una vista general con todas las tarjetas.' },
  { id: 'attention', label: 'Prioritario', helper: 'Casos que necesitan atencion inmediata.' },
  { id: 'active', label: 'En marcha', helper: 'Procesos avanzando en este momento.' },
  { id: 'done', label: 'Listo', helper: 'Resultados completados y listos para compartir.' },
]

function App() {
  const [activeFilter, setActiveFilter] = useState<ViewFilter>('all')
  const [lastAction, setLastAction] = useState(
    'Elige una tarjeta para ver su detalle o lanzar una accion.'
  )

  const visibleCards = cardExamples.filter((card) => {
    if (activeFilter === 'all') return true

    const statuses = card.badges.map((badge) => badge.status)

    if (activeFilter === 'attention') return statuses.includes('error') || statuses.includes('warning')
    if (activeFilter === 'active') return statuses.includes('info')
    if (activeFilter === 'done') return statuses.includes('success')

    return true
  })

  const activeFilterLabel = filterOptions.find((filter) => filter.id === activeFilter)?.helper

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero__copy">
          <p className="hero__eyebrow">Tu panel de hoy</p>
          <h1>Todo lo importante, claro y al alcance de un clic.</h1>
          <p className="hero__description">
            Revisa lo urgente, sigue lo que va en camino y entra rapido a cada tarea sin perderte
            entre pantallas.
          </p>

          <div className="hero__filters" aria-label="Filtros de vista">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={`hero__filter ${activeFilter === filter.id ? 'hero__filter--active' : ''}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <p className="hero__helper">{activeFilterLabel}</p>
        </div>

        <article className="hero__status">
          <p className="hero__status-label">Actividad reciente</p>
          <p className="hero__status-count">{visibleCards.length} opciones visibles</p>
          <p className="hero__status-value">{lastAction}</p>
        </article>
      </section>

      <section className="gallery">
        {visibleCards.map((card) => {
          // Centralizamos los iconos de badge en la vista para reutilizar el mismo componente.
          const badgesWithIcons = card.badges.map((badge) => ({
            ...badge,
            icon: badge.status ? badgeIcons[badge.status] : badgeIcons.neutral,
          }))

          return (
            <Card
              key={card.id}
              title={card.title}
              type={card.type}
              imageUrl={card.imageUrl}
              badges={badgesWithIcons}
              footer={
                <Button
                  text={card.buttonText}
                  variant={card.buttonVariant}
                  size={card.buttonSize}
                  disabled={card.buttonDisabled}
                  loading={card.buttonLoading}
                  leftIcon={<SparkIcon />}
                  rightIcon={card.buttonLoading ? undefined : <ArrowIcon />}
                  onClick={() => setLastAction(`Abriste "${card.title}" para continuar con esa gestion.`)}
                />
              }
            >
              <p className="card-copy">{card.description}</p>
            </Card>
          )
        })}
      </section>
    </main>
  )
}

export default App
