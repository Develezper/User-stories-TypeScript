# Ecommerce Lite (React + TypeScript + Bun)

Base project for user story **M5.4S1**: initial setup and entity modeling for an e-commerce app built with React and TypeScript.

## Objective

Create a frontend foundation with strict typing for products and users, using React + TypeScript and centralized mock data.

## Technologies

- Bun
- React
- TypeScript

## Folder Structure

```text
src/
  components/
    ProductCard.tsx
    ProductList.tsx
    UserCard.tsx
  data/
    data.ts
  interfaces/
    Address.ts
    Dimensions.ts
    Product.ts
    User.ts
  App.tsx
  App.css
  index.css
```

## Modeled Entities

- `Product` with required fields: `sku`, `name`, `brand`, `quantity`, `price`, `isActive`, `category`, `imageUrl`, `createdAt`.
- `User` with required fields: `id`, `fullName`, `email`, `isActive`, `role`, `address`, `createdAt`.
- Supporting interfaces: `Address`, `Dimensions`.
- Optional fields in `Product`: `tags`, `dimensions`, `description`.

## Mock Data

- `15` products.
- `5` users.
- Defined and typed in `src/data/data.ts`.

## Run with Bun

```bash
bun install
bun run dev
```

Default local app URL: `http://localhost:5173`.

## Production Build

```bash
bun run build
```

## Covered Criteria

- React + TypeScript project with Bun (`ecommerce-lite`).
- Interfaces defined (`Product`, `User`, `Address`, `Dimensions`).
- Centralized mock data for products and users.
- Initial product list rendered with `.map()`.
- Strictly typed props (`ProductCardProps`, `UserCardProps`).
- Code and README documentation.
