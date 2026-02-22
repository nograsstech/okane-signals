# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Package Management
```zsh
# Install dependencies
npm install

# Add a dependency
npm install <package>

# Add a dev dependency
npm install -D <package>
```

### Running the Application
```zsh
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Testing
```zsh
# Run all tests (integration + unit)
npm test

# Run only integration tests (Playwright)
npm run test:integration

# Run only unit tests (Vitest)
npm run test:unit

# Run a single test file
npx vitest run <file-path>
```

### Code Quality
```zsh
# Lint and check formatting
npm run lint

# Format code with Prettier
npm run format

# Type checking with svelte-check
npm run check

# Type checking with watch mode
npm run check:watch
```

### Database (Drizzle ORM)
```zsh
# Open Drizzle Studio (database GUI)
npm run db:studio

# Generate database migrations
npm run db:generate

# Push migrations to database
npm run db:migrate
```

## Architecture Overview

This is a **SvelteKit 5** frontend application for a trading strategy builder platform. It communicates with the backend `okane-finance-api` and uses Supabase/PostgreSQL for data persistence.

### Key Technologies
- **Framework:** SvelteKit 5 with Svelte 5 runes (`$state`, `$props`, `$derived`)
- **UI Components:** Custom components built with Tailwind CSS + `bits-ui`, `cmdk-sv`, `lucide-svelte`
- **Data Visualization:** Svelte Flow (`@xyflow/svelte`) for strategy node editor
- **Database:** Drizzle ORM with PostgreSQL (Supabase)
- **Authentication:** Auth.js (`@auth/sveltekit`) with Drizzle adapter
- **API Client:** Auto-generated TypeScript client from OpenAPI spec

### Project Structure

```
src/
├── routes/                    # SvelteKit file-based routing
│   ├── api/                   # API endpoints (server-side)
│   │   └── strategy/          # Strategy CRUD, trade actions, signals
│   ├── strategy/              # Strategy builder UI
│   │   └── [id]/              # Dynamic strategy pages with backtest
│   ├── editor/                # Node-based strategy editor (Svelte Flow)
│   ├── protected/             # Auth-protected routes
│   ├── signin/                # Auth pages
│   └── +layout.svelte         # Root layout
├── lib/
│   ├── components/            # Reusable UI components
│   │   ├── ui/                # shadcn-style components (button, card, dialog, etc.)
│   │   ├── svelte-flow/       # Node editor configuration and edges
│   │   └── strategy/          # Strategy-specific components
│   ├── drizzle/               # Database ORM
│   │   ├── schemas/           # Table definitions (users, backtestStats, tradeActions)
│   │   └── db.ts              # Database connection
│   ├── okane-finance-api/     # Auto-generated API client
│   │   └── generated/         # TypeScript client from OpenAPI spec
│   ├── supabase/              # Supabase client (for direct DB access)
│   ├── constants/             # Constants (landing features, sample data)
│   ├── enums/                 # Enums (node types, context menu actions)
│   ├── interfaces/            # TypeScript interfaces
│   └── utils/                 # Utility functions
├── hooks.server.ts            # SvelteKit server hooks (auth middleware)
└── auth/                      # Auth.js configuration
```

### API Client Generation

The `okane-finance-api` client is auto-generated from an OpenAPI spec:

```bash
# From src/lib/okane-finance-api/
./generate-client.sh
```

This generates TypeScript fetch client in `generated/` using `@openapitools/openapi-generator-cli`.

**Environment variables required for API client:**
- `OKANE_FINANCE_API_URL` — Backend API base URL
- `OKANE_FINANCE_API_USER` — Basic auth username
- `OKANE_FINANCE_API_PASSWORD` — Basic auth password

### Database Schema (Drizzle ORM)

**Tables:**
- `users`, `accounts`, `sessions`, `verificationTokens` — Auth.js tables (from `@auth/drizzle-adapter`)
- `backtestStats` — Cached backtest results from the API
- `tradeActions` — Individual trades from backtests

**Connection string:** Read from `POSTGRES_URI` environment variable.

### Authentication Flow

Auth.js with SvelteKit handles authentication:
- Server hooks in `hooks.server.ts` use `sequence()` to chain authentication and authorization
- Protected routes use `event.locals.auth()` to check session
- User data available in `event.locals.user` and `event.locals.session`

### Svelte Flow Integration

The strategy editor uses `@xyflow/svelte` for visual node-based strategy building:
- Configuration in `src/lib/components/svelte-flow/svelteFlowConfig/`
- Custom node types defined in `src/lib/enums/nodeTypes.ts`
- Context menu actions in `src/lib/enums/contextMenu.ts`

### Data Fetching Patterns

**Server-side load functions:**
```typescript
// src/routes/strategy/[id]/+page.ts
export async function load({ params }) {
  const strategy = await db.select().from(backtestStats)...
  return { strategy };
}
```

**API routes as proxy:**
```typescript
// src/routes/api/strategy/+server.ts
export async function GET({ url }) {
  // Check local DB cache first
  // If not found, call okaneClient.backtestSignalsBacktestGet()
  // Save to DB
  return json(result);
}
```

### Environment Variables

Required in `.env`:

| Variable | Purpose |
|----------|---------|
| `POSTGRES_URI` | PostgreSQL connection string (Drizzle) |
| `SUPABSE_PROJECT_URL` | Supabase project URL |
| `SUPABSE_KEY` | Supabase anonymous key |
| `OKANE_FINANCE_API_URL` | Backend API URL |
| `OKANE_FINANCE_API_USER` | API basic auth username |
| `OKANE_FINANCE_API_PASSWORD` | API basic auth password |
| `AUTH_SECRET` | Auth.js secret (generate with `openssl rand -base64 32`) |
| `AUTH_GITHUB_ID` | GitHub OAuth client ID |
| `AUTH_GITHUB_SECRET` | GitHub OAuth client secret |

### Adapter Configuration

Uses `@sveltejs/adapter-auto` for deployment. Can switch to:
- `@sveltejs/adapter-vercel` — Uncomment in `svelte.config.js`
- `@sveltejs/adapter-cloudflare` — Available but commented out

### Svelte 5 Compatibility

The project uses Svelte 5 with `componentApi: 4` compatibility mode in `svelte.config.js`. This enables:
- Runes (`$state`, `$props`, `$derived`)
- Universal components (`.svelte` files work for both client and server)

### Path Aliases

Configured in `svelte.config.js`:
- `@/*` → `./src/lib/*`

Used throughout the codebase for cleaner imports.

## Important Implementation Notes

### API Caching Strategy

The `/api/strategy` endpoint implements a caching layer:
1. Check if backtest exists in local DB by `strategyID`
2. If not, check if exists by `(ticker, period, interval, strategy)` combination
3. Return cached result if `created_at` is today
4. Otherwise, fetch from `okaneClient`, save to DB, and return

### Drizzle Migrations

Migrations are stored in `./drizzle` directory (configured in `drizzle.config.ts`). Use:
- `npm run db:generate` — Create migration files
- `npm run db:migrate` — Push schema changes directly (for development)
- `npm run db:studio` — Visual database browser

### HTML Decompression

Backtest HTML from the API is zlib-compressed and base64-encoded. Use `pako` library to decompress before rendering.

### TypeScript Configuration

- `tsconfig.json` should be at project root
- Svelte components use `<script lang="ts">`
- Run `npm run check` to catch type errors in `.svelte` files
