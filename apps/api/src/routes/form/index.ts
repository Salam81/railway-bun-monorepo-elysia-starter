import { Elysia } from "elysia";
import { formSubmitRoute } from "./submit";

export const formRoute = new Elysia({ name: "form", prefix: "/form" }).use(
	formSubmitRoute,
);
