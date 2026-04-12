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

function App() {
  const [lastAction, setLastAction] = useState('Aun no se ha ejecutado ninguna accion.')

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero__copy">
          <p className="hero__eyebrow">Semana 3 - M5.4S3</p>
          <h1>Componentes UI reutilizables con React + TypeScript</h1>
          <p className="hero__description">
            Esta vista demuestra un set de componentes tipados pensado para mantener una interfaz
            consistente, extensible y facil de reutilizar.
          </p>
        </div>

        <article className="hero__status">
          <p className="hero__status-label">Ultima accion</p>
          <p className="hero__status-value">{lastAction}</p>
        </article>
      </section>

      <section className="gallery">
        {cardExamples.map((card) => {
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
                  onClick={() => setLastAction(`Accion ejecutada en: ${card.title}`)}
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
