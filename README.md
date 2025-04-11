## BIRL Tech Test ♻️

### Deployment

Vercel manages our CI / CD Deployment Pipeline and enforces QA on our NextJS Codebase to push to production

The system deploys to https://birl-project.vercel.app/ from Vercel / Github

### Solution

This solution implements:

Product Listing, Search and UI:
1. Product Retrieval Functionality using the Next JS API drawing on mock data
2. Allows search against ID, Description and Title of Product
3. Provides a simple UI flow of Product Listings -> Checkout -> Failure / Success
4. Draws product data through API / Hook for use in the application

Stripe & Payment Processing
1. Requests and applies a manual 'extended hold' for the max credit amount for 10 days (subject to different card providers and Stripe)
2. Provides a direct Checkout / Purchase from the Listing Page
3. Provides a simple 'retry purchase' UI flow feature to encourage conversion if payment fails or user does not complete payment for any reason
4. Provides 2 options for Client-Side & Server-Side product  processing via API and Server Actions
5. Provides Success / Failure feedback to the User based off Stripe

Additional:
1. Safe Image / External Content and URL Handling
2. CI / CD Deployment Pipeline and Secure Persistent Infrastructure
3. Set up system to work through modern App Router and Server-Side Best Practice
4. QA / Tested as Production Ready Next JS Compliant

Technical Approach:
1. The system has been set up to take advantage of the better practice / modern 'app-router' using the 'app' file structure and using tools such as 'Server Actions' to optimise future security / performance phasing out the legacy Next JS 'page-router' - on a live system we can reduce tech debt and ease maintenance in the future with up-to-date Next tooling
2. The system has been tested with a compliant legacy 'page-router' for backwards compatability - but updated to move forward modern Next JS app router practice
3. Next-JS determines which router to use by whether there is an 'app' or 'pages ' directory - so this can be enabled by altering the name of the 'app' folder to disable 'app-router' and renaming 'legacy-pages' to 'pages' to re-enable 'pages-router
4. Using App Router and maintaining the codebase line in with Next JS v13-15 and onwards is seen as best practice and makes migrating both existing code and developing in the future easier - for example we support processing checkouts using Server Actions or fallback to a REST Checkout API endpoint if any network / cloud issue is detected and can direct client componenets and server components to use dedicated resources and best practice for each

### Running Locally

The system is still launched through npm when running locally or remotely on codespace separate from our CI / CD pipeline

Setup Dependencies:
To install dependencies run npm install:

```bash
npm install
```

You can also use the template of .env.example to create your own env.local - you can request or create your own stripe test credentials and deploy to loclhost:3000 by default

Run Local Environment:
To launch into development use npm run dev:

```bash
npm run dev
```

To build for production use npm run build:

```bash
npm run build
```

### NextJS

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

### Stripe Docs 
You will need to register a stripe account or create a project for development purposes. 
Stripe provides testing cards while in dev mode.

- [Stripe Testing](https://stripe.com/docs/testing)
- [Stripe Payments](https://stripe.com/docs/payments)
- [Stripe Extended Card Holds](https://docs.stripe.com/payments/extended-authorization?platform=web&ui=embedded-form&client=react)

### Original Specificaiton

This task is designed to test your front-end, back-end, and API integration skills with a real world scenario. 

We'd like you to create a simple Next.js app where the user can enter a product ID to fetch and display product details or an error message if appropriate. You can style the app as you see fit.

Please use the Next.js API to implement the product retrieval functionality. Instead of a database, we have provided static product data in `src/data/products.ts`, along with mock database calls `getProduct` and `getProductsIn`.

Next, the user should be taken to a payment screen where they can enter payment details using Stripe. The payment should place an **extended hold** on the card for the amount of `max_credit` for 10 days. For more details, see the documentation below. We recommend using the `Embedded Form` or `Advanced Integration`.

You shouldn't spend more than 3 hours on this project. We are interested in depth of knowledge and code quality, if you are unable to finish the tasks please write a short note stating where you got up to and how you would have approached the next steps.

You can start editing the page by modifying `pages/index.tsx`.

And build the api route for fetching products in `pages/api/products`

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.


