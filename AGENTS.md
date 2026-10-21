<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# MobileCity v3 Engineering Standards & Architecture Guidelines

## 1. Tech Stack Overview

- **Framework:** Next.js 16 (App Router + Turbopack)
- **UI & Styling:** React 19, Tailwind CSS v4, Lucide React
- **ORM & Database:** Prisma 5.22, SQLite (`dev.db`)
- **Validation:** Zod
- **Testing:** Playwright E2E

## 2. Architecture: Screaming Feature-Based

Codebase is structured by business domain capabilities:

- `src/features/<feature-name>/`:
  - `components/`: Feature-specific UI components (keep client components focused and small).
  - `services/`: Feature-specific data access and business logic (Prisma database access).
  - `schemas/`: Zod schemas for payload validation and search params.
  - `types/`: Feature-scoped TypeScript types and interfaces.
- `src/shared/`: Cross-cutting shared modules:
  - `components/ui/`: Atomic design primitives (Button, Input, Modal, Badge, Toast).
  - `components/layout/`: Global navigation and layout (Header, Footer, MegaMenu, MobileBottomNav).
  - `context/`: Shared React context providers (CartContext, RegionContext, ToastContext).
  - `lib/`: Shared utilities, constants, and database client (`db.ts`).
  - `types/`: Universal system types and models.
- `src/app/`: Strictly thin routing layer (React Server Components by default).

## 3. Server vs Client Component Rules

- **Server First:** By default, every `page.tsx`, `layout.tsx`, and presentation component is a Server Component.
- **Client Leaf Rule:** Mark `"use client"` ONLY on leaf interactive components that require state (`useState`), effects (`useEffect`), browser events (`onClick`, `onChange`), or Context hooks.
- Never wrap large composite views into a single client component.

## 4. Database Access & Service Layer Rules

- NEVER invoke Prisma queries directly inside Route Handlers (`app/api/*`) or client components.
- Encapsulate all database operations within domain service functions under `src/features/*/services/*.service.ts`.
- Validate all incoming API or form inputs using Zod before passing to service layer.

## 5. Git Conventions

- All commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/):
  - `feat:` New user-facing feature
  - `fix:` Bug fix
  - `refactor:` Code restructuring without behavioral change
  - `perf:` Performance optimization
  - `chore:` Tooling, dependency, or config update
  - `docs:` Documentation or specs
  - `test:` E2E or unit tests
- Automatically validated on commit via Husky and Commitlint hooks.

## 6. Essential Commands

- `npm run dev`: Start Next.js development server with Turbopack.
- `npm run build`: Type-check and produce production build.
- `npm run lint`: Run ESLint analysis.
- `npm run format`: Format code with Prettier.
- `npm run format:check`: Check formatting status.
- `npm run test:e2e`: Execute Playwright test suite.
