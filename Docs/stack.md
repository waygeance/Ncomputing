# stack.md — Tech Stack

## Why this stack?

| Layer | Choice | Why |
|---|---|---|
| Frontend | React + Vite | Fast dev server, modern, widely known |
| Styling | Tailwind CSS | Utility classes, no separate CSS files needed |
| State | Zustand | Tiny, no boilerplate, perfect for a cart |
| Backend | Node + Express | Simple, JavaScript throughout, no context switching |
| ORM | Prisma | Clean schema file, auto-generates client, easy migrations |
| Database | PostgreSQL (Neon) | Free tier, serverless Postgres, works with Prisma |
| Payments | Razorpay test mode | Indian gateway, INR support, easy sandbox |
| Email | Nodemailer + Gmail | Free, no extra service needed, simple setup |
| Deploy | Vercel + Render | Both have free tiers, easy to configure |

## What we chose NOT to use
- TypeScript — adds complexity for a small assignment
- Redux — Zustand is simpler
- Next.js — no SSR needed, plain Vite is faster to scaffold
- Real product images — original CSS visuals to avoid copyright
