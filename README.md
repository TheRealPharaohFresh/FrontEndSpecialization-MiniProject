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
