# Payng Frontend

Next.js 15 App Router dashboard for Payng. It uses Turbopack for dev/build, Tailwind CSS v4, shadcn/ui primitives, TanStack Query for server cache, Zustand for local state, and React Hook Form + Zod for forms.

## Getting Started

```bash
# install deps (choose one)
bun install
# or npm install

# develop
bun run dev     # Turbopack dev server on http://localhost:3000

# lint & build
bun run lint
bun run build && bun run start
```

Environment variables live in `.env.local`. Set anything the backend expects plus `NEXT_PUBLIC_*` values for client-side usage (e.g. API base URLs).

## Project Structure

```
payng-frontend
├── app/                  # Next.js App Router entries and providers
│   ├── layout.tsx        # Root layout that wires fonts + themes
│   ├── page.tsx          # Marketing/landing page
│   ├── dashboard/        # Authenticated dashboard route
│   ├── profile/          # User profile route
│   └── providers.tsx     # Query client + theme providers
├── components/
│   ├── layouts/          # Shell layouts (e.g. dashboard chrome)
│   ├── dashboard/        # Feature widgets (cards, tables, actions)
│   └── ui/               # Reusable shadcn-derived primitives
├── lib/
│   ├── api.ts            # Axios client + mock data helpers
│   ├── pdfGenerator.tsx  # React-PDF template for receipts
│   └── utils.ts          # Misc view helpers
├── stores/               # Zustand slices (e.g. dashboardStore)
├── public/               # Static assets served by Next.js
├── globals.css           # Tailwind entry (imports layer directives)
├── components.json       # shadcn-ui generator manifest
├── next.config.ts        # Next.js + Turbopack settings
└── tsconfig.json         # Path aliases & TS compiler options
```

## Development Notes

- API calls currently point to `/api` with mocked data in `lib/api.ts`; swap in real backend routes once available.
- Most UI pieces are decoupled and live under `components/dashboard` or `components/ui`; prefer composing existing atoms before adding new ones.
- `stores/dashboardStore.tsx` keeps view state (selected student, filters). Fetching/caching should go through TanStack Query in `app/providers.tsx`.
- Tailwind CSS v4 is configured via `postcss.config.mjs`; no traditional `tailwind.config.js` file is required.

## Testing & Linting

- Run `bun run lint` for ESLint (Next.js + TypeScript rules).
- Component-level testing is not set up yet; add Playwright or Vitest when UI automation becomes necessary.
