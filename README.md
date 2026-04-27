# random-people-client

React front end for browsing and saving random user profiles.

## Stack

- React 18 + TypeScript
- Vite 5
- Redux Toolkit + RTK Query
- React Router v6
- Tailwind CSS (Bubblegum theme)
- Hand-rolled shadcn-style UI primitives (Button, Input, Card, Avatar)

## Prerequisites

- Node.js 20+

## Setup

```bash
cp .env.example .env
npm install
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server on port 5173 |
| `npm run build` | Type-check and bundle to `dist/` |
| `npm run preview` | Serve the production build locally |

## Docker

```bash
docker build \
  --build-arg VITE_API_URL=http://localhost:4000 \
  -t random-people-client .
docker run -p 5173:5173 random-people-client
```

## Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:4000` | Base URL of the backend API (baked in at build time) |

## Architecture notes

- RTK Query manages all server state with automatic cache invalidation
- `randomUserApi` fetches from randomuser.me and maps results to the shared `Profile` type
- `profilesApi` talks to the Express backend; tags ensure the list re-fetches after mutations
- `profilesSlice` holds filter state, the random users list, and the current selection
- The random list lives in Redux so in-session name edits (Update on ProfilePage) survive navigation
- UI primitives are in `src/components/ui/` and consume only semantic Tailwind color tokens

## Trade-offs and production improvements

- No tests - would add Vitest + React Testing Library
- Client-side filtering only - would add server-side query params for large datasets
- No auth
- No CI/CD pipeline
- `VITE_API_URL` is baked in at Docker build time, so a rebuild is needed to point at a different backend
