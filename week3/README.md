# User Story M5.4S3

Implementation of reusable UI components (`Button`, `Badge`, and `Card`) with strongly typed TypeScript props for React.

## Objective

Build a small interface that guarantees:

- visual consistency
- strong typing
- modular components
- a main view with cards that integrate badges and buttons

## Stack

- React 19
- TypeScript 5
- Vite
- ESLint

## Structure

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

## How to Run

```bash
bun install
bun run dev
```

To validate the project:

```bash
bun run build
bun run lint
```

## Components

### `Button`

Available props:

- `text: string` required
- `variant?: "primary" | "secondary" | "danger"` with default `primary`
- `size?: "sm" | "md" | "lg"` with default `md`
- `disabled?: boolean`
- `loading?: boolean`
- `leftIcon?: React.ReactNode`
- `rightIcon?: React.ReactNode`
- `onClick?: MouseEventHandler<HTMLButtonElement>`

Example:

```tsx
import { Button } from './components'

<Button
  text="Save changes"
  variant="primary"
  size="md"
  leftIcon={<span>+</span>}
  onClick={() => console.info('saved')}
/>
```

### `Badge`

Available props:

- `label: string` required
- `status?: "success" | "warning" | "info" | "error" | "neutral"` with default `neutral`
- `icon?: React.ReactNode`

Example:

```tsx
import { Badge } from './components'

<Badge label="In progress" status="info" />
```

### `Card`

Available props:

- `title: string` required
- `type: "green" | "white" | "black"` required
- `imageUrl?: string`
- `footer?: React.ReactNode`
- `badges?: { label: string; status?: BadgeStatus; icon?: React.ReactNode }[]`
- `children?: React.ReactNode`

Notes:

- `Card` renders at least one `Badge` even if no `badges` prop is provided, using a default neutral badge.
- `footer` is designed to host primary actions such as `Button`.

Example:

```tsx
import { Button, Card } from './components'

<Card
  title="New project"
  type="white"
  badges={[{ label: 'In progress', status: 'info' }]}
  footer={<Button text="View details" variant="primary" />}
>
  <p>Quick project summary.</p>
</Card>
```

## Covered Criteria

- Reusable `Button` with variants, sizes, and optional states.
- Reusable `Badge` with typed statuses and optional icon support.
- Reusable `Card` with `title`, `type`, `imageUrl`, `footer`, and integrated badges.
- Functional main view displaying a list of cards.
- Brief code comments documenting key implementation decisions.

## Main Files

- `src/components/Button/Button.tsx`
- `src/components/Badge/Badge.tsx`
- `src/components/Card/Card.tsx`
- `src/App.tsx`
- `src/data/cards.ts`
