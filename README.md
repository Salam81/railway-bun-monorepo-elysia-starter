# Deploy and Host a Bun Monorepo with Railway

<img src="https://railway.com/brand/logo-light.svg" width="128" /> <img src="https://bun.com/logo.svg" width="128" /> <img src="https://elysiajs.com/assets/elysia.svg" width="128" />

A production-ready monorepo template featuring **Bun** as the package manager and runtime, **Elysia** as the API framework, and **React + Vite** for the frontend. Designed for seamless deployment on Railway with end-to-end type safety between frontend and backend.

## About Hosting a Bun Monorepo

Deploying a monorepo requires coordinating multiple services that share code and types. This template handles the complexity by:

- Separating the API and UI into independent Railway services
- Using a shared `contracts` package for type-safe communication
- Compiling the API to a single native binary for optimal performance
- Configuring private networking for secure service-to-service communication

The architecture ensures each service can scale independently while maintaining a single source of truth for shared types.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              RAILWAY SERVICES                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   ┌────────────────────────┐     Public Network     ┌───────────────────────┐   │
│   │                        │◄──────────────────────►│                       │   │
│   │ @bun-monorepo-railway  │                        │ @bun-monorepo-railway │   │
│   │         /api           │                        │        /ui            │   │
│   │                        │                        │                       │   │
│   │    ┌─────────────┐     │    Type-Safe API       │      ┌──────────┐     │   │
│   │    │   Elysia    │     │    (Eden Treaty)       │      │  React   │     │   │
│   │    │   Server    │◄────┼────────────────────────┼──────│  + Vite  │     │   │
│   │    └─────────────┘     │                        │      └──────────┘     │   │
│   │                        │                        │                       │   │
│   └───────────┬────────────┘                        └───────────┬───────────┘   │
│               │                                                 │               │
│               └─────────────────────────┬───────────────────────┘               │
│                                         │                                       │
│                                         ▼                                       │
│                       ┌──────────────────────────────────────┐                  │
│                       │   @bun-monorepo-railway/contracts    │                  │
│                       │                                      │                  │
│                       │       Shared Type Exports            │                  │
│                       │       (Type-only package)            │                  │
│                       └──────────────────────────────────────┘                  │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Common Use Cases

- **Full-stack applications** with type-safe API calls between frontend and backend
- **Microservices** that share types across multiple services
- **Rapid prototyping** with hot reload on both frontend and backend
- **Production deployments** with optimized native binary compilation

---

## Project Structure

```
bun-monorepo-railway/
├── apps/
│   ├── api/          # Elysia backend server
│   └── ui/           # React + Vite frontend
├── packages/
│   └── contracts/    # Shared type definitions
├── biome.json        # Linting & formatting config
├── package.json      # Root workspace configuration
└── tsconfig.base.json
```

---

## Dependencies

### Workspace Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| [Bun](https://bun.sh) | >=1.3.5 | JavaScript runtime, package manager, and bundler. Chosen for native TypeScript support, fast startup times, and built-in workspace support. |
| [TypeScript](https://www.typescriptlang.org) | ^5.9 | Static type checking across all packages. |
| [Biome](https://biomejs.dev) | 2.3.10 | Fast linting and formatting. Replaces ESLint + Prettier with a single tool. |

### API (`apps/api`)

| Package | Version | Purpose |
|---------|---------|---------|
| [Elysia](https://elysiajs.com) | ^1.4.19 | Type-safe HTTP framework for Bun. Provides automatic type inference for routes, enabling end-to-end type safety with Eden. |
| [@elysiajs/cors](https://elysiajs.com/plugins/cors) | ^1.4.0 | CORS middleware for cross-origin requests from the frontend. |

### UI (`apps/ui`)

| Package | Version | Purpose |
|---------|---------|---------|
| [React](https://react.dev) | ^19.2.0 | UI library for building component-based interfaces. |
| [Vite](https://vite.dev) | ^7.2.4 | Build tool with instant HMR and optimized production builds. |
| [TailwindCSS](https://tailwindcss.com) | ^4.1.17 | Utility-first CSS framework. V4 uses the new native engine for faster builds. |
| [TanStack Query](https://tanstack.com/query) | ^5.90.12 | Server state management with caching, background updates, and mutations. |
| [React Hook Form](https://react-hook-form.com) | ^7.69.0 | Performant form handling with minimal re-renders. |
| [Arktype](https://arktype.io) | ^2.1.29 | Runtime type validation with TypeScript-first syntax. Used for form schema validation. |
| [@elysiajs/eden](https://elysiajs.com/eden/overview) | ^1.4.6 | Type-safe API client that infers types from Elysia routes. Provides end-to-end type safety. |
| [Base UI](https://base-ui.com) | ^1.0.0 | Unstyled, accessible React primitives. Used via shadcn for headless UI components. |
| [shadcn/ui](https://ui.shadcn.com) | ^3.6.2 | Component collection built on Base UI with Tailwind styling. |
| [Sonner](https://sonner.emilkowal.ski) | ^2.0.7 | Toast notifications for success/error feedback. |

### Contracts (`packages/contracts`)

This package contains **type-only exports** from the API. No runtime dependencies - it simply re-exports TypeScript types for the frontend to consume.

---

## Environment Variables

### API Service

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port. Defaults to `3000`. Railway sets this automatically. |
| `FRONTEND_URL` | Yes | Frontend origin for CORS. Use `${{ui.RAILWAY_PUBLIC_DOMAIN}}` to reference the UI service. |

### UI Service

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | Yes | API base URL. Use `${{api.RAILWAY_PRIVATE_DOMAIN}}` for private networking or `${{api.RAILWAY_PUBLIC_DOMAIN}}` for public. |

**Railway Variable References:**
- Use `${{service.VARIABLE}}` syntax to reference variables from other services
- Prefer `RAILWAY_PRIVATE_DOMAIN` over `RAILWAY_PUBLIC_DOMAIN` for service-to-service communication (free, faster, more secure)

---

## Local Development

### Prerequisites

- [Bun](https://bun.sh) >= 1.3.5

### Setup

```bash
# Install dependencies
bun install

# Start all services in development mode
bun dev

# Or start services individually
bun dev:api  # API on port 3000
bun dev:ui   # UI on port 5173
```

### Environment Files

Create `.env` files for local development:

**`apps/api/.env`**
```env
PORT=3000
FRONTEND_URL=http://localhost:5173
```

**`apps/ui/.env`**
```env
VITE_API_URL=http://localhost:3000
```

---

## Railway Deployment

### Service Configuration

This template deploys as **two separate Railway services**:

#### API Service

| Setting | Value |
|---------|-------|
| Root Directory | `apps/api` |
| Build Command | `bun run build` |
| Start Command | `./dist/server` |
| Watch Paths | `apps/api/**`, `packages/contracts/**` |

#### UI Service

| Setting | Value |
|---------|-------|
| Root Directory | `apps/ui` |
| Build Command | `bun run build` |
| Start Command | `bunx --bun serve -s dist -l tcp://0.0.0.0:$PORT` |
| Watch Paths | `apps/ui/**`, `packages/contracts/**` |

### Health Checks

The API includes a health endpoint at `/health`. Configure Railway's health check:

| Setting | Value |
|---------|-------|
| Path | `/health`|
| Timeout | `30s` |

---

## Available Scripts

### Root

| Script | Description |
|--------|-------------|
| `bun dev` | Start all services in development mode |
| `bun dev:api` | Start only the API |
| `bun dev:ui` | Start only the UI |
| `bun lint` | Check for linting issues |
| `bun lint:write` | Fix linting issues automatically |
| `bun format` | Format all files |
| `bun clean:modules` | Remove all `node_modules` and lockfile |

### API (`apps/api`)

| Script | Description |
|--------|-------------|
| `bun dev` | Start with hot reload |
| `bun build` | Compile to native binary (`dist/server`) |

### UI (`apps/ui`)

| Script | Description |
|--------|-------------|
| `bun dev` | Start Vite dev server |
| `bun build` | Build for production |
| `bun preview` | Preview production build locally |

---

## Adding New Packages

### New Shared Package

```bash
mkdir -p packages/new-package/src
cd packages/new-package
bun init -y
```

Update the package name to follow the `@bun-monorepo-railway/` scope.

### New App

```bash
mkdir -p apps/new-app/src
cd apps/new-app
bun init -y
```

Add to `workspaces.packages` in the root `package.json` if using a different directory structure.

---

## Why Deploy Bun + Elysia + React (Monorepo) on Railway?

Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

By deploying Bun + Elysia + React (Monorepo) on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.

---

## External Resources

- [Bun Documentation](https://bun.sh/docs)
- [Elysia Documentation](https://elysiajs.com)
- [Eden Treaty Guide](https://elysiajs.com/eden/treaty/overview)
- [Railway Monorepo Guide](https://docs.railway.app/guides/monorepo)

---

## License

MIT

