# User Story M5.4S2

React + TypeScript application created to demonstrate modular authentication, user CRUD management, and extensibility through decorators.

## Objective

Implement a decoupled login flow, a `UserStore` class with CRUD operations, and a decorator that automatically enriches newly created users with:

- `role: "user"`
- `createdAt: Date.now()`

## Project Structure

```text
week2/
  src/
    components/
      Dashboard.tsx
      Login.tsx
    data/
      users.ts
    interfaces/
      User.ts
    utils/
      auth.ts
      decorators.ts
      UserStore.ts
    App.tsx
    App.css
    index.css
    main.tsx
  index.html
  package.json
  tsconfig.app.json
  tsconfig.json
  tsconfig.node.json
  vite.config.ts
```

## Implemented Features

### TASK 1

- Modular login flow with `authenticate` in `src/utils/auth.ts`.
- `User` interface and helper types in `src/interfaces/User.ts`.
- Centralized mock users in `src/data/users.ts`.
- Success and error messages in the login view.
- Redirect to the main view using hash-based navigation (`#/login` and `#/dashboard`).

### TASK 2

- `UserStore` class in `src/utils/UserStore.ts`.
- Implemented methods:
  - `list()`
  - `findByName()`
  - `create()`
  - `update()`
  - `remove()`
- Each method logs a simulated HTTP action in the console:
  - `GET`
  - `POST`
  - `PATCH`
  - `DELETE`

### TASK 3

- `enrichNewUser` decorator in `src/utils/decorators.ts`.
- Applied to `create()` in `UserStore`.
- The decorator adds `role` and `createdAt` before the original method logic runs.

## Test Credentials

You can sign in with any of these mock accounts:

| Name | Email | Password | Status |
| --- | --- | --- | --- |
| Ana Torres | `ana.torres@riwi.dev` | `Admin123*` | Active |
| Mateo Ruiz | `mateo.ruiz@riwi.dev` | `Mateo456*` | Active |
| Sara Jimenez | `sara.jimenez@riwi.dev` | `Sara789*` | Inactive |

## How to Run

```bash
bun install
bun run dev
```

The app is served by default at `http://localhost:5173`.

## How to Test the Story

1. Sign in with an active account.
2. Confirm that the app redirects to the main dashboard.
3. Open the browser console.
4. Use the search field to trigger `findByName()`.
5. Create a user from the form and verify in the UI that the new entry appears with the `user` role.
6. Confirm the `POST /users` log in the console and check that the new user already includes `role` and `createdAt`.
7. Use the `Activate/Deactivate` and `Delete` buttons to validate `update()` and `remove()`.

## Covered Criteria

- `CA_01` to `CA_06`: Modular login, validation, feedback messages, and redirect flow.
- `CA_07` to `CA_10`: CRUD class with simulated HTTP logs.
- `CA_11` to `CA_14`: Decorator applied to the `create` method without breaking its base logic.

## Covered Requirements

- `RF_01`: Functional and modular login.
- `RF_02`: Types and information organized by modules.
- `RF_03`: CRUD flow with console traceability.
- `RF_04`: Automatic data extension through decorators.
- `RNF_01` to `RNF_04`: Modular, typed solution that is easy to run locally.
