import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import { formRoute } from "./routes/form";

const app = new Elysia()
	.use(
		cors({
			origin: [Bun.env.FRONTEND_URL],
			allowedHeaders: [
				"Content-Type",
				"Authorization",
				"Referrer-Policy",
				"user-agent",
			],
			methods: ["GET", "POST", "DELETE", "PUT"],
			credentials: true,
		}),
	)
	.use(formRoute)
	.get("/health", () => ({ status: "ok" }))
	.listen({ port: Number(Bun.env.PORT ?? 3000), hostname: "0.0.0.0" });

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
