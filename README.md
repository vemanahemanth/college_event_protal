# College Event Intelligence Portal

A full-stack monorepo for managing college events, registrations, analytics, and leaderboards at Chanakya University.

## Architecture

| Layer | Tech | Hosting |
|-------|------|---------|
| Frontend | React 19 + Vite + Tailwind CSS v4 | Vercel |
| Backend | Express 5 + Drizzle ORM | Render |
| Database | PostgreSQL (Neon) | Neon Cloud |

## Project Structure

```
.
├── artifacts/
│   ├── event-portal/     # React frontend (Vite SPA)
│   └── api-server/       # Express REST API
├── lib/
│   ├── db/               # Drizzle schema + database client
│   ├── api-client-react/ # Auto-generated API client hooks
│   └── api-zod/          # Zod schemas for API validation
└── vercel.json           # Vercel deployment config
```

## Local Development

### Prerequisites
- Node.js 20+
- pnpm 9+

### Setup

```bash
# Install dependencies
pnpm install

# Copy env files
cp .env.example .env
cp artifacts/api-server/.env.example artifacts/api-server/.env
# Fill in DATABASE_URL in both files

# Run backend (in one terminal)
cd artifacts/api-server
pnpm dev

# Run frontend (in another terminal)
cd artifacts/event-portal
pnpm dev
```

The frontend runs on `http://localhost:3000` and proxies `/api` to the backend at `localhost:5001`.

## Deployment

### Frontend → Vercel

1. Push this repo to GitHub
2. Import the repo in [Vercel dashboard](https://vercel.com/new)
3. Vercel will auto-detect `vercel.json` — no extra config needed
4. Set environment variable in Vercel:
   - `VITE_API_BASE_URL` = your Render backend URL (e.g. `https://college-event-api.onrender.com`)
5. Update `vercel.json` → replace `https://your-backend.onrender.com` with your real backend URL

### Backend → Render

See `artifacts/api-server/.env.example` for required environment variables.
Set `DATABASE_URL`, `PORT=10000`, `NODE_ENV=production` in Render's environment settings.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ Backend | PostgreSQL connection string |
| `PORT` | ✅ Backend | Server port (Render sets this automatically) |
| `NODE_ENV` | ✅ Backend | `production` or `development` |
| `VITE_API_BASE_URL` | ✅ Frontend (prod) | Full URL of deployed backend |

## Features

- 🎓 **Admin Portal** — Event management, approvals, analytics, user management
- 🧑‍🎓 **Student Portal** — Browse events, register, view leaderboards
- 📊 **Analytics** — Registration trends, category breakdowns, college participation
- 🏆 **Leaderboards** — College and participant rankings
- 📅 **Calendar** — Event schedule view