import { useEffect, useRef, useState, type ReactNode } from 'react'
import './App.css'
import { Button, Card, type BadgeStatus } from './components'
import { cardExamples, type CardAction, type CardExample, type CardId, type CardState } from './data/cards'

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
  { id: 'all', label: 'Todo', helper: 'Una vista general con todas las tareas.' },
  { id: 'attention', label: 'Por atender', helper: 'Lo que necesita una respuesta inmediata.' },
  { id: 'active', label: 'En proceso', helper: 'Acciones que siguen abiertas o en marcha.' },
  { id: 'done', label: 'Resuelto', helper: 'Tareas que ya quedaron listas.' },
]

const initialCardStates = Object.fromEntries(
  cardExamples.map((card) => [card.id, card.initialState])
) as Record<CardId, CardState>

const getCardView = (card: CardExample, currentState: CardState) => {
  const view = card.states[currentState]

  if (!view) {
    throw new Error(`No hay configuracion para ${card.id} en el estado ${currentState}.`)
  }

  return view
}

function App() {
  const [cardStates, setCardStates] = useState<Record<CardId, CardState>>(initialCardStates)
  const [activeFilter, setActiveFilter] = useState<ViewFilter>('all')
  const [lastAction, setLastAction] = useState<string | null>(null)
  const [loadingCardId, setLoadingCardId] = useState<CardId | null>(null)
  const loadingTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current !== null) {
        window.clearTimeout(loadingTimeoutRef.current)
      }
    }
  }, [])

  const cardViews = cardExamples.map((card) => ({
    ...card,
    view: getCardView(card, cardStates[card.id]),
  }))

  const visibleCards = cardViews.filter((card) => {
    if (activeFilter === 'all') return true
    return card.view.bucket === activeFilter
  })

  const runAction = (cardId: CardId, action: CardAction) => {
    if (action.type === 'instant') {
      setCardStates((currentStates) => ({
        ...currentStates,
        [cardId]: action.nextState,
      }))
      setLastAction(action.completedMessage)
      return
    }

    if (loadingTimeoutRef.current !== null) {
      window.clearTimeout(loadingTimeoutRef.current)
    }

    setLoadingCardId(cardId)
    setLastAction(action.pendingMessage ?? null)

    loadingTimeoutRef.current = window.setTimeout(() => {
      setCardStates((currentStates) => ({
        ...currentStates,
        [cardId]: action.nextState,
      }))
      setLoadingCardId(null)
      setLastAction(action.completedMessage)
      loadingTimeoutRef.current = null
    }, action.delayMs ?? 1500)
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero__copy">
          <p className="hero__eyebrow">Tu panel de hoy</p>
          <h1>Todo lo importante, claro y al alcance de un clic.</h1>
          <p className="hero__description">
            Organiza tus tareas por prioridad, avanza las que siguen abiertas y deja que cada
            tarjeta refleje su estado real.
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

          <p className="hero__helper">{filterOptions.find((filter) => filter.id === activeFilter)?.helper}</p>
          {lastAction ? <p className="hero__feedback">{lastAction}</p> : null}
        </div>
      </section>

      <section className="gallery">
        {visibleCards.length ? (
          visibleCards.map((card) => {
            const badgesWithIcons = card.view.badges.map((badge) => ({
              ...badge,
              icon: badge.status ? badgeIcons[badge.status] : badgeIcons.neutral,
            }))

            return (
              <Card
                key={card.id}
                title={card.view.title}
                type={card.type}
                imageUrl={card.imageUrl}
                badges={badgesWithIcons}
                footer={
                  <Button
                    text={card.view.buttonText}
                    variant={card.view.buttonVariant}
                    size="md"
                    disabled={card.view.buttonDisabled}
                    loading={loadingCardId === card.id}
                    leftIcon={<SparkIcon />}
                    rightIcon={loadingCardId === card.id ? undefined : <ArrowIcon />}
                    onClick={() => {
                      if (card.view.action) {
                        runAction(card.id, card.view.action)
                      }
                    }}
                  />
                }
              >
                <p className="card-copy">{card.view.description}</p>
              </Card>
            )
          })
        ) : (
          <article className="gallery__empty">
            <p className="gallery__empty-eyebrow">Todo al dia</p>
            <h2>No hay tareas en esta vista.</h2>
            <p>Cambia el filtro para revisar otra parte del panel.</p>
          </article>
        )}
      </section>
    </main>
  )
}

export default App
