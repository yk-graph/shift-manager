<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->

# Documentation first

Your training data may be out of date. Before writing or changing code that depends on a library or tool, read its latest official documentation. If your answer or implementation differs from the documentation, follow the documentation.

Each package has its own `AGENTS.md` listing the technologies it uses and where to read about them. Read it before working in that package.

## Root-level technologies

| Area                                    | Where to read                                        |
| --------------------------------------- | ---------------------------------------------------- |
| pnpm workspaces, catalog, `allowBuilds` | https://pnpm.io/workspaces, https://pnpm.io/catalogs |
| Docker Compose (`compose.dev.yaml`)     | https://docs.docker.com/compose/                     |
| MySQL 8.4 (Docker image `mysql:8.4`)    | https://dev.mysql.com/doc/refman/8.4/en/             |
| Prettier                                | https://prettier.io/docs/                            |
