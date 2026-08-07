# deploy.md — Deployment Guide

## Services Used
- **Database**: Neon (free Postgres)
- **Backend**: Render (free Web Service)
- **Frontend**: Vercel (free)

---

## Step 1 — Database (Neon)

1. Go to neon.tech → create a new project
2. Copy the connection string
3. Put it in `backend/.env` as `DATABASE_URL`
4. Run migrations:
   ```bash
   cd backend
   npx prisma migrate deploy
   node prisma/seed.js
   ```

---

## Step 2 — Backend (Render)

1. Push repo to GitHub
2. Go to render.com → New Web Service → connect repo
3. Root directory: `backend`
4. Build command: `npm install && npx prisma generate`
5. Start command: `node src/server.js`
6. Add all backend env vars in the Render dashboard
7. Copy the Render URL (e.g. `https://xxx.onrender.com`)

---

## Step 3 — Frontend (Vercel)

1. Go to vercel.com → Import Git Repository
2. Root directory: `frontend`
3. Framework: Vite
4. Add env vars:
   - `VITE_API_URL` = your Render backend URL
   - `VITE_RAZORPAY_KEY_ID` = your Razorpay test key
5. Deploy

---

## Step 4 — Connect CORS

In `backend/.env`, set:
```
FRONTEND_URL=https://<your-vercel-app>.vercel.app
```
Redeploy backend on Render.

---

## Step 5 — Verify

- Open the Vercel URL
- Place a full test order using Razorpay test card: `4111 1111 1111 1111`
- Check that confirmation email is received
- Log into `/admin/login` and check the order appears
