declare module "bun" {
	interface Env {
		PORT?: string;
		FRONTEND_URL: string;
	}
}
