# Unique Store

Unique Store is a React e-commerce application with a product catalog, category browsing, cart, checkout, account authentication, product management, and order history. It uses Firebase Authentication and Cloud Firestore for account and store data.

## Features

- Browse the product collection and filter products by category.
- Add products to a session-persisted shopping cart and place orders.
- Register and sign in with Firebase Authentication.
- Manage products and review order history.
- Run component, cart, and product-fetch tests with Jest.

## Requirements

- Node.js 20 or later
- npm
- A Firebase project with Authentication (email/password) and Cloud Firestore enabled

The Firebase web configuration is in `src/config/firebaseConfig.ts`. Configure Firestore collections and security rules for `products`, `users`, and `orders` before using the application with live data.

## Getting Started

```sh
npm ci
npm run dev
```

Vite prints the local development URL after the server starts.

## Project Checks

```sh
npm test -- --runInBand
npm run lint
npm run typecheck
npm run build
```

The GitHub Actions workflow runs tests, lint, type-checking, and a production build on pushes to `main` and `master`. After those checks pass, it deploys to Vercel. Deployment requires the `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, and `VERCEL_TOKEN` repository secrets.

## Deployment

The production site is configured at [eccomerceapp1.vercel.app](https://eccomerceapp1.vercel.app/).

## Author

Donald Clemons


