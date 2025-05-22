# simple-monorepo

This project is a monorepo that combines a backend built with AdonisJS and a frontend developed with Vue.js. It uses shared TypeScript types to ensure consistency of data and interfaces across different parts of the application.

## Project Structure

- **`backend/`**: Contains the source code for the backend developed with AdonisJS.
  - Manages routes, controllers, models, and middleware.
  - Uses TypeScript to type data and services.
  
- **`frontend/`**: Contains the source code for the frontend developed with Vue.js.
  - Includes Vue components, pages, and store management.
  
- **`packages/types/`**: Contains shared TypeScript types and utilities.
  - Ensures type consistency between the frontend and backend.
  - Facilitates code reuse and reduces duplication.

## Project Setup

```sh
pnpm install
```

### Setup Backend
```sh
cd backend
cp .env.example .env
node ace migration:fresh --seed
```

## Compile and Hot-Reload for Development

```sh
pnpm dev
```

## Technologies Used

- **Backend**: AdonisJS, PostgreSQL
- **Frontend**: Vue.js, Vue Router, Pinia, TanStack Query
- **Build Tools**: Vite, pnpm
