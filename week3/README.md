# Historia de Usuario M5.4S3

Implementacion de componentes UI reutilizables (`Button`, `Badge` y `Card`) con props tipadas en TypeScript para React.

## Objetivo

Construir una mini interfaz demostrativa que garantice:

- consistencia visual
- tipado fuerte
- componentes modulares
- una vista principal con cards que integran badges y botones

## Stack

- React 19
- TypeScript 5
- Vite
- ESLint

## Estructura

```text
week3/
|-- src/
|   |-- components/
|   |   |-- Badge/
|   |   |-- Button/
|   |   `-- Card/
|   |-- data/
|   |-- App.tsx
|   `-- main.tsx
|-- bun.lock
|-- package.json
`-- README.md
```

## Como ejecutar

```bash
bun install
bun run dev
```

Para validar el proyecto:

```bash
bun run build
bun run lint
```

## Componentes

### `Button`

Props disponibles:

- `text: string` obligatorio
- `variant?: "primary" | "secondary" | "danger"` con default `primary`
- `size?: "sm" | "md" | "lg"` con default `md`
- `disabled?: boolean`
- `loading?: boolean`
- `leftIcon?: React.ReactNode`
- `rightIcon?: React.ReactNode`
- `onClick?: MouseEventHandler<HTMLButtonElement>`

Ejemplo:

```tsx
import { Button } from './components'

<Button
  text="Guardar cambios"
  variant="primary"
  size="md"
  leftIcon={<span>+</span>}
  onClick={() => console.info('guardado')}
/>
```

### `Badge`

Props disponibles:

- `label: string` obligatorio
- `status?: "success" | "warning" | "info" | "error" | "neutral"` con default `neutral`
- `icon?: React.ReactNode`

Ejemplo:

```tsx
import { Badge } from './components'

<Badge label="En curso" status="info" />
```

### `Card`

Props disponibles:

- `title: string` obligatorio
- `type: "green" | "white" | "black"` obligatorio
- `imageUrl?: string`
- `footer?: React.ReactNode`
- `badges?: { label: string; status?: BadgeStatus; icon?: React.ReactNode }[]`
- `children?: React.ReactNode`

Notas:

- La `Card` renderiza al menos un `Badge` incluso si no recibe `badges`, usando un badge neutral por defecto.
- `footer` esta pensado para integrar acciones principales con `Button`.

Ejemplo:

```tsx
import { Button, Card } from './components'

<Card
  title="Nuevo proyecto"
  type="white"
  badges={[{ label: 'En curso', status: 'info' }]}
  footer={<Button text="Ver detalles" variant="primary" />}
>
  <p>Resumen rapido del proyecto.</p>
</Card>
```

## Criterios cubiertos

- `Button` reutilizable con variantes, tamanos y estados opcionales.
- `Badge` reutilizable con estados tipados e icono opcional.
- `Card` reutilizable con `title`, `type`, `imageUrl`, `footer` y badges integrados.
- Vista principal con un listado funcional de cards.
- Comentarios breves en el codigo para documentar decisiones clave.

## Archivos principales

- `src/components/Button/Button.tsx`
- `src/components/Badge/Badge.tsx`
- `src/components/Card/Card.tsx`
- `src/App.tsx`
- `src/data/cards.ts`
