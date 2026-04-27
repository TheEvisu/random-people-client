# random-people-client

React front end for browsing random user profiles and saving them to a personal collection.

## Stack

- React 19 + TypeScript
- Vite 6
- Redux Toolkit + RTK Query
- React Router v7
- Tailwind CSS

## Prerequisites

- Node.js 22+

## Local setup

```bash
cp .env.example .env
npm install
npm run dev
```

App runs at `http://localhost:5173`. Requires the server to be running.

## Environment variables

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Base URL of the backend (default: `http://localhost:4000`) |

## Build

```bash
npm run build
npm run preview
```

## Docker

```bash
docker build \
  --build-arg VITE_API_URL=http://localhost:4000 \
  -t random-people-client .

docker run -p 5173:5173 random-people-client
```

## Running the full stack

From the parent folder (contains `docker-compose.yml`):

```bash
docker compose up --build
```
