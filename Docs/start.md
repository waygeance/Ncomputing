# start.md — How to Run Locally

## Requirements
- Node.js 18+
- PostgreSQL (or use Neon cloud)
- npm

## 1. Backend

```bash
cd backend
npm install
npx prisma migrate dev --name init
node prisma/seed.js
node src/server.js
```

Runs on: http://localhost:8080

## 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on: http://localhost:5173

## 3. Env files
- Copy `backend/.env.example` → `backend/.env` and fill values
- Copy `frontend/.env.example` → `frontend/.env` and fill values

See `env.md` for what each variable means.
