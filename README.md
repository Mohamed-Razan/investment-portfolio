# Investment Portfolio

A personal investment portfolio manager: track companies/people you invest with, their investments (variable-profit or fixed-profit/Wakala), transaction ledgers, and automatically calculated profit percentages when an investment is closed.

## Tech stack

- **Next.js 16** (App Router, Server Actions, TypeScript, Tailwind CSS v4)
- **PostgreSQL** via **Prisma ORM** (v6)
- **Auth.js (NextAuth v5)** — single-admin credentials login, JWT sessions
- **shadcn/ui** (Base UI primitives)
- **Zod** for validation

## Local development

### 1. Start a local Postgres database

```bash
docker run --name investment-portfolio-db \
  -e POSTGRES_USER=app -e POSTGRES_PASSWORD=app -e POSTGRES_DB=investment_portfolio \
  -p 5433:5432 -d postgres:16-alpine
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in real values:

```bash
cp .env.example .env
```

- `DATABASE_URL` — e.g. `postgresql://app:app@localhost:5433/investment_portfolio`
- `AUTH_SECRET` — generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` — `http://localhost:3000` for local dev
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — used only by the seed script to create the first login

### 3. Install dependencies, migrate, and seed

```bash
npm install
npx prisma migrate dev
npm run db:seed
```

### 4. Run the dev server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) and log in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set.

## Deploying for free (Neon + Vercel)

### 1. Create a free Postgres database on Neon

1. Go to [neon.tech](https://neon.tech) and sign up (free tier, autosuspends when idle instead of pausing for days like some alternatives).
2. Create a new project. Copy the **pooled connection string** it gives you (starts with `postgresql://...`).

### 2. Run migrations against the Neon database

From your machine, temporarily point at the Neon connection string and apply migrations once:

```bash
DATABASE_URL="<your-neon-pooled-url>" npx prisma migrate deploy
DATABASE_URL="<your-neon-pooled-url>" ADMIN_EMAIL="you@example.com" ADMIN_PASSWORD="a-strong-password" npm run db:seed
```

This creates the schema and your admin login in production. Do this from your own terminal — don't share your real admin password with anyone else.

### 3. Push the repo to GitHub

Vercel deploys from a Git repository:

```bash
git add -A
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 4. Import the project into Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import your GitHub repository.
2. Set these Environment Variables in the Vercel project settings:
   - `DATABASE_URL` — the same Neon pooled connection string
   - `AUTH_SECRET` — the same value you generated locally (or a new one, as long as it's set)
   - `NEXTAUTH_URL` — your Vercel deployment URL (e.g. `https://your-app.vercel.app`)
3. Deploy. `postinstall` runs `prisma generate` automatically, and `build` runs `prisma generate && next build`.

### 4a. Future schema changes

Whenever you change `prisma/schema.prisma` and create a new migration locally, run `prisma migrate deploy` against the Neon `DATABASE_URL` again (or wire it into a CI/CD or Vercel deploy hook) before/after pushing, so production picks up the new schema.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Generate Prisma client and build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run db:migrate` | Create/apply a dev migration (`prisma migrate dev`) |
| `npm run db:seed` | Seed/upsert the admin user |
| `npm run db:studio` | Open Prisma Studio |

## Core concepts

- **Companies** — the people/entities you invest with.
- **Investments** — belong to a company, have a unique `codeName` (e.g. `GGP001`), and are either:
  - **Variable profit** — principal is invested, returns come in over time at uncertain dates; monthly profit % is calculated automatically from the transaction ledger once the investment is closed.
  - **Fixed profit (Wakala)** — a known monthly rate (`fixedRatePerMonth`) is set upfront.
- **Transactions** — a ledger per investment; negative amounts are principal invested, positive amounts are returns/profit received.
- **Open / Closed workflow** — while **open**, transactions and details can be freely edited. **Closing** an investment locks it and computes `totalPrincipal`, `totalReturned`, `profitAmount`, `durationMonths`, and `monthlyProfitPercent`. Editing a closed investment requires **reopening** it first (which clears the cached numbers); closing it again recalculates everything from the current ledger.
