# Stayfinder — React Router 8

This is the React Router v8 Framework Mode port of the Stayfinder Next.js App Router project. It keeps the same routes, rendered markup, Tailwind styling, mock data, and React Query interactions while using React Router route modules and loaders.

## Requirements

- Node.js 22.22 or newer (Node 24 is recommended)
- Yarn 1.22.22

## Development

Install dependencies:

```bash
yarn install
```

Start the mock API in one terminal:

```bash
yarn api
```

Start React Router in another terminal:

```bash
yarn dev
```

The app runs at [http://localhost:5173](http://localhost:5173), and the mock API runs at [http://188.34.137.61:4000](http://188.34.137.61:4000).

## Checks and production

```bash
yarn typecheck
yarn build
yarn start
```

The production app defaults to [http://localhost:3000](http://localhost:3000). Keep `yarn api` running alongside it.

## Routes

- `/`
- `/about`
- `/contact`
- `/plp`
- `/pdp/:slug`

The PLP and PDP routes support `stDate` and `rtDate` URL search parameters.

## Docker

The included image starts both the mock API and the production React Router server:

```bash
docker build -t stayfinder-react-router .
docker run -p 3000:3000 -p 4000:4000 stayfinder-react-router
```
