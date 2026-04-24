# Properties CRUD with Next.js, MongoDB, and Mongoose

This project implements the M5.4S4 user story: a complete properties CRUD built with Next.js App Router, MongoDB, Mongoose, and Axios-based services consumed from a dashboard view.

## Stack

- Next.js 16 with the App Router
- React 19
- MongoDB
- Mongoose
- Axios
- TypeScript

## Features

- MongoDB connection helper with a global cached Mongoose connection for development
- Property model with name, value, and optional image URL
- Route Handlers for GET, POST, PUT, and DELETE
- Axios service layer in src/services/properties.ts
- Minimal dashboard UI in src/app/dashboard/properties/page.tsx
- Reproducible database seed script for sample properties
- Local MongoDB start and stop scripts from npm

## Project Structure

- src/lib/db.ts: MongoDB connection management
- src/database/models/Property.ts: Mongoose property model
- src/app/api/properties/route.ts: GET and POST handlers
- src/app/api/properties/[id]/route.ts: PUT and DELETE handlers
- src/services/properties.ts: Axios API service functions
- src/app/dashboard/properties/page.tsx: properties dashboard
- scripts/seed-properties.mjs: database seed script
- scripts/start-mongodb.mjs: local MongoDB starter
- scripts/stop-mongodb.mjs: local MongoDB stopper

## Environment Variables

Create a .env file with the following variable:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/properties_dashboard
```

## Available Scripts

```bash
npm install
npm run mongodb:start
npm run seed:properties
npm run dev
```

Additional scripts:

```bash
npm run dev:full
npm run build
npm run lint
npm run mongodb:stop
```

Script details:

- npm run mongodb:start: starts a local MongoDB instance using the .mongodb-data directory inside the project
- npm run mongodb:stop: stops the local MongoDB instance
- npm run seed:properties: resets the properties collection and inserts sample records
- npm run dev:full: starts MongoDB and launches Next.js development mode

## Running the Project

1. Install dependencies.
2. Start MongoDB with npm run mongodb:start.
3. Seed the database with npm run seed:properties.
4. Start the development server with npm run dev.
5. Open http://localhost:3000/dashboard/properties.

If you want a one-step local startup, use npm run dev:full and then run npm run seed:properties in a second terminal.

## Sample Data

The seed script inserts these example properties:

- Apartamento Centro
- Casa Campestre
- Loft Industrial Premium
- Local Comercial

## API Endpoints

### GET /api/properties

Returns all properties ordered by creation date.

### POST /api/properties

Creates a property.

Request body example:

```json
{
	"name": "Casa Campestre",
	"value": 580000000,
	"img": "https://example.com/image.jpg"
}
```

### PUT /api/properties/[id]

Updates a property by id.

### DELETE /api/properties/[id]

Deletes a property by id.

## Axios Service Layer

The dashboard uses the following service functions from src/services/properties.ts:

- getProperties
- postProperty
- updateProperty
- deleteProperty

## User Story Coverage

### Task 1: Initial setup

- Completed: Next.js project created
- Completed: mongoose and axios installed
- Completed: .env created with MONGODB_URI

### Task 2: MongoDB connection

- Completed: src/lib/db.ts created
- Completed: global cached connection pattern implemented

### Task 3: Property model

- Completed: src/database/models/Property.ts created
- Completed: schema includes name, value, and img with default empty string

### Task 4: API implementation

- Completed: GET and POST in src/app/api/properties/route.ts
- Completed: PUT and DELETE in src/app/api/properties/[id]/route.ts

### Task 5: Axios services

- Completed: src/services/properties.ts created
- Completed: getProperties, postProperty, updateProperty, and deleteProperty implemented

### Task 6: Dashboard view

- Completed: src/app/dashboard/properties/page.tsx created
- Completed: form for creating properties
- Completed: listing loaded from getProperties
- Completed: edit and delete actions connected to the service layer

## Acceptance Criteria Review

- Stable MongoDB connection using Mongoose: completed
- Functional CRUD endpoints in /api/properties and /api/properties/[id]: completed
- Axios service functions working: completed
- Dashboard listing and management flow working: completed
- Project runs in development without application errors when MongoDB is started: completed

## Validation Performed

- npm run build
- npm run lint
- npm run seed:properties
- POST, GET, PUT, and DELETE tested against the API
- MongoDB documents verified directly with mongosh
- Dashboard verified in the browser with seeded data

## Notes

- The project assumes a local MongoDB instance on 127.0.0.1:27017 unless MONGODB_URI is changed.
- The seeded dataset can be restored at any time with npm run seed:properties.
