#Module1-AdvancedEccomerceProject

Description: 
For my e-commerce assignment, I built a product catalog, shopping cart, and checkout system using React, Redux Toolkit, React Query, and FakeStoreAPI.

Product Catalog & Category Navigation

I used React Query to fetch and display products on the Home component, showing title, price, category, description, rating, and image. A dynamic dropdown retrieves categories from FakeStoreAPI, filtering products based on selection.

Shopping Cart & State Management

Redux Toolkit manages cart state, handling add, update, and remove actions. The Shopping Cart component lists added products with quantity and price, allowing removals. Cart data persists via sessionStorage to maintain state across sessions.

Total Calculation & Checkout

The cart dynamically updates total items and price. Since FakeStoreAPI lacks order processing, checkout simulates a purchase by clearing Redux state and sessionStorage, with visual confirmation.

This project showcases my ability to integrate API calls, manage state, and create a functional e-commerce experience.


Author: Donald Clemons
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
