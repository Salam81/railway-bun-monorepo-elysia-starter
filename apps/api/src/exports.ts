/**
 * @bun-monorepo-railway/api - External Type Exports
 *
 * This file defines the PUBLIC type interface for the API package.
 * Only types are exported - NO runtime code should ever be exported from this file.
 *
 * @exports
 * - `App`: The Elysia application type for Eden type-safe API client
 *
 * @security
 * - Uses `export type` to guarantee no runtime code leaks
 * - This file is the ONLY entry point for external type consumers
 *
 * @usage
 * External packages should import via @bun-monorepo-railway/contracts, which re-exports these types:
 * ```ts
 * import type { App } from "@bun-monorepo-railway/contracts";
 * ```
 *
 * @note
 * The package.json "exports" field points to this file for types,
 * ensuring bundlers and TypeScript resolve to type-only exports.
 */

export type { App } from "./index";
