# simple-monorepo

Monorepo combining an AdonisJS 7 backend and a Vue 3 + Vite frontend, with a shared `contracts` package for runtime values exchanged between both sides (enums, constants).

## Workspace layout

```
backend/                  AdonisJS 7 API
  app/modules/user/       Feature module (controllers, model, validator, service, transformer)
frontend/                 Vue 3 SPA (Vite, Pinia, vue-query, vue-router)
  src/modules/user/       Mirror of the backend module (composables, views, routes)
packages/contracts/       Runtime values shared between front and back (enums)
```

The frontend consumes the backend's API types via the auto-generated **Tuyau** registry — no shared validator package needed. Local helpers `ApiBody<>` and `ApiResponse<>` are exposed from `frontend/src/composables/useApi.ts`.

## Tooling

The whole workspace (backend, frontend, packages) uses **Vite+** (`vp` CLI): Oxlint for linting, Oxfmt for formatting, type-aware checks via `vp check`. Everything is configured in the root `vite.config.ts` — there is no ESLint or Prettier anywhere in the repo.

- One code style for the whole monorepo: single quotes, semicolons (Oxfmt defaults + `singleQuote`).
- The rules from the former `@adonisjs/eslint-config` preset that matter (`curly`, `eqeqeq`, `unicorn/filename-case` in snake_case, `unicorn/prefer-node-protocol`, …) live in a `backend/**/*.ts` override in `vite.config.ts`.
- Generated code (`**/.adonisjs/**`, `backend/database/schema.ts`, `backend/build`, `backend/tmp`) is excluded from lint and format.
- The `staged` hook runs `vp check --fix` on every staged file, backend included.

## Commands

|                                                    | Command                                           |
| -------------------------------------------------- | ------------------------------------------------- |
| Install dependencies                               | `vp install`                                      |
| Run dev (both backend + frontend in parallel)      | `pnpm dev` (alias for `vp run -r --parallel dev`) |
| Lint + format + type-aware check (whole workspace) | `vp check`                                        |
| Auto-fix lint/format                               | `vp check --fix`                                  |
| Run tests                                          | `vp test`                                         |
| Frontend production build                          | `pnpm --filter @my-monorepo/frontend build`       |
| Backend typecheck (tsc)                            | `pnpm --filter @my-monorepo/backend typecheck`    |
| Backend tests (Japa)                               | `pnpm --filter @my-monorepo/backend test`         |
| Backend dev only                                   | `pnpm --filter @my-monorepo/backend dev`          |
| Generate Lucid schema after migration              | `cd backend && node ace schema:generate`          |

## Architectural conventions

**Backend (`app/modules/<feature>/`)**

- One controller per use case (`create_user_controller.ts`, `list_users_controller.ts`, etc.). REST method names (`store`, `index`, `show`, `update`, `destroy`) stay idiomatic.
- Rich Lucid models hold intrinsic business logic (`user.activate()`).
- `services/` only when there's real orchestration (multiple entities, side effects, shared by 2+ controllers). Not as wrappers.
- No repositories — Lucid is the data layer.
- Validators use Vine's native `.unique()`. Pass `meta` via `request.validateUsing(validator, { meta })` for context-aware rules (e.g. excluding the current user on update).
- Routes named explicitly (`.as('users.show')`) for Tuyau's typed registry.
- Controllers are imported lazily in `start/routes.ts` (`const X = () => import('#user/controllers/x')`) — required by hot-hook HMR. This used to be enforced by the AdonisJS ESLint plugin; it is now a convention only.
- Backend file names are `snake_case` (enforced by `unicorn/filename-case`). Classes injected via `@inject()` must be imported as values, never `import type`, or decorator metadata breaks DI.

**Frontend (`src/modules/<feature>/`)**

- Composables group queries/mutations per resource (mirrors backend controller grouping).
- Type the request body via `ApiBody<'route.name'>` — corresponds to Vine's `InferInput` for forms.
- Type responses via `ApiResponse<'route.name'>`.

## Contracts (shared package)

`packages/contracts/` exports enums and runtime values usable from both Node and the browser. Only put things here that need to **exist at runtime** in both environments. Types alone don't need this package — the Tuyau registry already covers them.

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.

<!--VITE PLUS END-->
