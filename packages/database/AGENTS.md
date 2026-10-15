# Documentation first

Prisma changes between major versions (config, generator, client setup). Your training data may be out of date. Read the latest official documentation before changing the schema, config, or client setup. If your answer or implementation differs from the documentation, follow the documentation.

This package uses Prisma ORM 7 (`prisma` and `@prisma/client` 7.x) with MySQL through `@prisma/adapter-mariadb`. Prisma ORM 8 is a release candidate; do not apply v8 syntax unless the package is upgraded.

| Area                                       | Where to read                                                                   |
| ------------------------------------------ | ------------------------------------------------------------------------------- |
| Doc index for LLMs                         | https://www.prisma.io/docs/llms.txt, https://www.prisma.io/docs/llms/orm-v7.txt |
| MySQL + `@prisma/adapter-mariadb`          | https://www.prisma.io/docs/orm/overview/databases/mysql                         |
| `prisma.config.ts`                         | https://www.prisma.io/docs/orm/reference/prisma-config-reference                |
| Schema, multi-file schema, generators      | https://www.prisma.io/docs/orm/prisma-schema                                    |
| `db push`, `migrate dev`, `migrate deploy` | https://www.prisma.io/docs/orm/prisma-migrate                                   |
| Changelog                                  | https://www.prisma.io/changelog                                                 |
| MySQL 8.4                                  | https://dev.mysql.com/doc/refman/8.4/en/                                        |

## Project conventions

- Schema files live in `prisma/schema/`, split by domain. The generated client goes to `src/generated` (gitignored).
- Local development uses `pnpm db:push`. Migration files are created only when the first deployment is ready.
- Company-owned tables carry `companyId`. Keep tenant isolation in mind for every query.
