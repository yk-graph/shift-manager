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
- **MySQL 8.4** via **Prisma 7** (`@prisma/adapter-mariadb`)
- Cookie sessions with **bcryptjs** password hashing
- **Tailwind CSS 4**
- **pnpm** workspaces + **Turborepo**

## Getting started (local)

### Prerequisites

- Node.js 20+
- pnpm
- Docker (MySQL runs in a container)

### 1. Clone and install

```bash
git clone <this-repo-url>
cd shift-manager
pnpm install
```

### 2. Set up environment variables

```bash
cp .env.example .env                                         # MySQL credentials for Docker Compose
cp packages/database/.env.example packages/database/.env    # DATABASE_URL for Prisma CLI and seed
cp apps/web/.env.example apps/web/.env                        # DATABASE_URL for the web app
```

Keep the user and password in both `DATABASE_URL`s in sync with the root `.env`.

### 3. Start MySQL

```bash
docker compose -f docker-compose.dev.yml up -d
```

MySQL listens on `127.0.0.1:4329`.

### 4. Create the schema and seed data

```bash
pnpm --filter @shift-manager/database db:push   # apply the schema and generate the client
pnpm --filter @shift-manager/database db:seed   # insert sample company, users, shifts
```

### 5. Run the app

```bash
pnpm dev
```

Open http://localhost:4320.

### Test accounts

All seeded accounts use the password `password123`.

| Role           | Email                      |
| -------------- | -------------------------- |
| Platform admin | platform-admin@example.com |
| Company admin  | admin@abc-company.test     |
| Employee       | taro@abc-company.test      |

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

| Command                                           | What it does                         |
| ------------------------------------------------- | ------------------------------------ |
| `pnpm dev`                                        | Start the dev server                 |
| `pnpm build`                                      | Production build                     |
| `pnpm lint`                                       | Run ESLint                           |
| `pnpm typecheck`                                  | Run TypeScript checks                |
| `pnpm format`                                     | Format with Prettier                 |
| `pnpm --filter @shift-manager/database db:push`   | Apply the schema to the database     |
| `pnpm --filter @shift-manager/database db:seed`   | Seed sample data                     |
| `pnpm --filter @shift-manager/database db:studio` | Open Prisma Studio (browse the data) |
