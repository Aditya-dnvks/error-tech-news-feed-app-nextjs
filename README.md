This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Application Architecture
The News Feed App is structured as follows:

1. **pages/index.tsx:** The entry point of the application.
2. **components/NewsFeed.tsx:** Contains the NewsFeed component that fetches and displays the news articles.
3. **components/SwipeButton.tsx:** Contains the SwipeButton component which is a custom swipe control to fetch news.
4. **public**: Contains static assets such as images.
   
## Core Components
1. **pages/index.tsx:**
   - Sets up the main container and renders the NewsFeed component.
2. **components/NewsFeed.tsx:**
   - Uses SWR for fetching news data from a public API.
   - Manages the state to display news articles.
   - Contains the SwipeButton component to trigger news fetching.
3. **components/SwipeButton.tsx:**
   - Custom swipe control component.
   - Handles swipe gestures to trigger news fetch operation.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
