## BIRL Tech Test ♻️

### Solution

This solution implements:

Product Listing, Search and UI:
1. Product Retrieval Functionality using the Next JS API drawing on mock data
2. Allows search against ID, Description and Title of Product
3. Provides a simple UI flow of Product Listings -> Checkout -> Failure / Success

Stripe & Payment Processing
1. Requests and applies a manual 'extended hold' for the max credit amount for 10 days (subject to different card providers and Stripe)
2. Provides a direct Checkout / Purchase from the Listing Page
3. Provides a simple 'retry purchase' UI flow feature to encourage conversion if payment fails or user does not complete payment for any reason
4. Provides 2 options for Client-Side & Server-Side checkout processing via API and Server Actions
5. Provides Success / Failure feedback to the User based off Stripe

Technical Approach:
1. The system has been set up to take advantage of the better practice / modern 'app-router' using the 'app' file structure and using tools such as 'Server Actions' to optimise future security / performance phasing out the legacy Next JS 'page-router' - on a live system we can reduce tech debt and ease maintenance in the future with up-to-date Next tooling
2. The system has been tested with the legacy 'page-router' for backwards compatability - Next determines which router to use by whether there is an 'app' or 'pages ' directory - so this can be enabled by altering the name of the 'app' folder to disable 'app-router' and renaming 'legacy-pages' to 'pages' to re-enable 'pages-router
3. Using App Router and maintaining the codebase line in with Next JS v13-15 and onwards is seen as best practice and makes migrating both existing code and developing in the future easier - for example using modern Next JS this solution supports processing checkouts using Server Actions or can fallback to a REST Checkout API endpoint if any network / cloud issue is detected

### Running Locally

The system is still launched through npm whether running locally or remotely

```bash
npm install
# then
npm run dev
```

When running locally - .env.local provides test stripe account keys and automatically forwards the system to run on http://localhost:3000



### Task Specification

This task is designed to test your front-end, back-end, and API integration skills with a real world scenario. 

We'd like you to create a simple Next.js app where the user can enter a product ID to fetch and display product details or an error message if appropriate. You can style the app as you see fit.

Please use the Next.js API to implement the product retrieval functionality. Instead of a database, we have provided static product data in `src/data/products.ts`, along with mock database calls `getProduct` and `getProductsIn`.

Next, the user should be taken to a payment screen where they can enter payment details using Stripe. The payment should place an **extended hold** on the card for the amount of `max_credit` for 10 days. For more details, see the documentation below. We recommend using the `Embedded Form` or `Advanced Integration`.

You shouldn't spend more than 3 hours on this project. We are interested in depth of knowledge and code quality, if you are unable to finish the tasks please write a short note stating where you got up to and how you would have approached the next steps.

During the interview with our technical team, we will spend 5-10 minutes discussing your approach, additional features you might consider adding, and any problems you encountered.

Please avoid using AI code generators to write code, asking questions to help understand the problem is okay though.

### Gotten stuck?

If you get stuck starting the NextJs project locally, run into problems, or have any other questions feel free to reach out to `theo@wearebirl.com`

### Already finished?
Great! Either zip the finished project or push it to a public Git repo and send it over to `theo@wearebirl.com`. If you zip the project please delete the node_modules dir first!

### Starting the project

**This project requires Node version 20**

First, run the development server:

```bash
npm install
# then
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`.

And build the api route for fetching products in `pages/api/products`

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

### NextJS

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

### Stripe Docs 
You will need to register a stripe account or create a project for development purposes. 
Stripe provides testing cards while in dev mode.

- [Stripe Testing](https://stripe.com/docs/testing)
- [Stripe Payments](https://stripe.com/docs/payments)
- [Stripe Extended Card Holds](https://docs.stripe.com/payments/extended-authorization?platform=web&ui=embedded-form&client=react)
