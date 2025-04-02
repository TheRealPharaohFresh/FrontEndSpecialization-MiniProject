 Advanced E-Commerce App

Description
This project is an e-commerce application built using **React, Redux Toolkit, React Query, and Firebase**. It includes a product catalog, shopping cart, user authentication, and order management.
 Features
- User Authentication: Users can register, log in, and manage profiles with Firebase Authentication.
- Firestore Database: Products, user data, and orders are stored in Firestore.
- Shopping Cart & Checkout: Items persist across sessions, and users can complete purchases.
- Product Management: Users can add, update, and delete products.
- Order History: Users can view past orders and details.
- Testing: A unit test was added for the "Add to Cart" button to verify UI functionality.
- CI/CD: Automated testing and deployment are handled via GitHub Actions and Vercel.

 CI/CD Workflow
This project uses GitHub Actions for automated testing and deployment with Vercel. Below is the workflow configuration:


name: Vercel Deployment
env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
on:
  push:
    branches:
      - main
      - master

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node JS
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm test
      - run: npm run build
      
  Deploy-Production:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/checkout@v2
      - name: Install Vercel CLI
        run: npm install --global vercel@latest
      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      - name: Build Project Artifacts
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      - name: Deploy Project Artifacts to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}


Deployment
The application is deployed using **Vercel**, with automatic builds and tests on every push to `main` or `master`.

Live Link: [View the application](eccomerceapp1.vercel.app)

 Author
Donald Clemons


