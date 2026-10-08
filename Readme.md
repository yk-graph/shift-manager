# ABC Dumplings — Staff Time Clock

An internal time-clock app for **ABC Dumplings** (a dumpling restaurant group under ABC Holding Ltd.).
Employees clock in and out; admins see who is working and review weekly hours.

**Live app:** https://abc-dumplings.vercel.app/

## Team

- Tatsuya Yokokura
- Guilherme Siebert
- Jamie
- Mamede Santana

## Tech stack

- **Next.js 16** (App Router) + **React 19**
- **PostgreSQL** (Neon) via **Prisma 7**
- Cookie sessions with **bcryptjs** password hashing
- **Tailwind CSS 4**
- Deployed on **Vercel**

## Getting started (local)

### Prerequisites

- Node.js 20+
- A PostgreSQL database — a free [Neon](https://neon.tech) project is easiest (or any local Postgres)

### 1. Clone and install

```bash
git clone <this-repo-url>
cd project_10_time-sheet-management
npm install
```

`npm install` runs `prisma generate` automatically.

### 2. Set up environment variables

Copy the example file and fill in your database connection strings:

```bash
cp .env.example .env
```

```bash
# .env
DATABASE_URL=         # direct connection — used for migrations
DATABASE_URL_POOLED=  # pooled connection — used by the app at runtime
```

Both come from your Neon project (Dashboard → Connection string). For a local
Postgres, you can set both to the same `postgresql://...` URL.

### 3. Create the schema and seed data

```bash
npm run db:migrate   # apply migrations
npm run db:seed      # insert sample admin, employees, branches, shifts
```

### 4. Run the app

```bash
npm run dev
```

Open http://localhost:3000.

### Test accounts

| Role     | Email                    | Password      |
| -------- | ------------------------ | ------------- |
| Admin    | admin@abcdumplings.ca    | admin123      |
| Employee | maria@abcdumplings.ca    | password123   |

## Deployment

Deployment is automatic: **every push to `main` triggers a deploy.** Vercel is
connected to the repo and rebuilds on each push to `main`. The same push also runs
the `Mirror to personal repo` GitHub Action (`.github/workflows/cd.yml`), which
mirrors `main` to the personal repo's `assignment` branch.

### Ship a change (recommended: via a PR)

```bash
# 1. create a feature branch
git switch -c feature/my-change

# 2. commit and push it
git add -A
git commit -m "feat: my change"
git push origin feature/my-change
```

Then open a Pull Request into `main` on GitHub and merge it. Merging updates
`main`, which triggers the Vercel deploy and the mirror Action.

### Or push to `main` directly

```bash
git switch main
git pull origin main
git push origin main   # triggers the Vercel deploy + the mirror Action
```

### One-time setup (already configured)

- **Vercel** — repo imported; `DATABASE_URL` and `DATABASE_URL_POOLED` set under
  Settings → Environment Variables.
- **Neon** — schema applied once with `npx prisma migrate deploy` and seeded with
  `npm run db:seed`.
- **GitHub Action** — `PERSONAL_REPO_TOKEN` (secret) and `MIRROR_OWNER` /
  `MIRROR_REPO` (variables) configured for the mirror job.

> Keep connection strings only in `.env` (local) and Vercel's environment
> variables — never commit them.

## Useful scripts

| Command              | What it does                          |
| -------------------- | ------------------------------------- |
| `npm run dev`        | Start the dev server                  |
| `npm run build`      | Production build                      |
| `npm run db:migrate` | Apply Prisma migrations               |
| `npm run db:seed`    | Seed sample data                      |
| `npm run db:studio`  | Open Prisma Studio (browse the data)  |
| `npm run lint`       | Run ESLint                            |
| `npm run format`     | Format with Prettier                  |
