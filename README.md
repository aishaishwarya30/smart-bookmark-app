🔖 Smart Bookmark App

A clean and modern web app to save and manage your favorite links with real-time updates.

✨ Features

Add bookmarks with optional titles

View all saved links

Delete bookmarks

Real-time updates across users

Modern UI with light/dark mode

Secure user authentication

Built with Next.js (App Router)

🛠 Tech Stack

Next.js 16 (App Router)

React

Tailwind CSS

Supabase (Database + API)

Deployed on Vercel

🚀 Getting Started (Local Setup)
git clone https://github.com/aishaishwarya30/smart-bookmark-app.git
cd smart-bookmark-app
npm install
npm run dev

💡 Challenges & Solutions

Challenge: Implementing real-time updates for bookmarks across users.
Solution: Used state management with API calls to ensure instant synchronization.

Challenge: Securing user authentication and privacy.
Solution: Implemented Supabase authentication with hashed passwords; each user can only access their own bookmarks.

Challenge: Deploying a fully functional app on Vercel.
Solution: Configured environment variables and ensured database connections worked in production.

🔗 Live Demo

Smart Bookmark App on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
