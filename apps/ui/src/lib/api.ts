import type { App } from "@bun-monorepo-railway/contracts";
import { treaty } from "@elysiajs/eden";

/**
 * Type-safe API client using Eden Treaty.
 * Provides end-to-end type safety between frontend and backend.
 *
 * Configured with:
 * - Base URL from VITE_API_URL environment variable
 * - Credentials included for cookie-based authentication
 */
export const api = treaty<App>(`${import.meta.env.VITE_API_URL}/`, {
	fetch: {
		credentials: "include",
	},
});
