# env.md — Environment Variables

## Backend (`backend/.env`)

| Variable | What it is |
|---|---|
| `DATABASE_URL` | Neon (or any Postgres) connection string |
| `RAZORPAY_KEY_ID` | Razorpay test mode key id |
| `RAZORPAY_KEY_SECRET` | Razorpay test mode secret |
| `SMTP_USER` | Gmail address used to send order emails |
| `SMTP_PASS` | Gmail App Password (not your real password) |
| `ADMIN_PASSWORD` | Password to log in to the admin dashboard |
| `JWT_SECRET` | Any random string — signs admin JWT tokens |
| `FRONTEND_URL` | Deployed Vercel URL (for CORS) |
| `PORT` | Port the backend listens on (default 8080) |

## Frontend (`frontend/.env`)

| Variable | What it is |
|---|---|
| `VITE_API_URL` | URL of the backend (Render or localhost) |
| `VITE_RAZORPAY_KEY_ID` | Same Razorpay key id (safe to expose on frontend) |

## Notes
- Never commit `.env` files — they are in `.gitignore`
- Use `.env.example` files (checked in) to document the shape
