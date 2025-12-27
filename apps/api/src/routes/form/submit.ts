import { Elysia, t } from "elysia";

/**
 * Submit a form
 * @name form-submit
 * @path /form/submit
 * @method post
 */
export const formSubmitRoute = new Elysia({ name: "form-submit" }).post(
	"/submit",
	({ body }) => {
		console.log("Form submitted successfully", body);

		return {
			success: true,
			message: "Form submitted successfully",
		};
	},
	{
		body: t.Object({
			name: t.String({ minLength: 1 }),
			role: t.Optional(
				t.Union([
					t.Literal("developer"),
					t.Literal("designer"),
					t.Literal("manager"),
					t.Literal("other"),
					t.Null(),
				]),
			),
			comments: t.Optional(t.String()),
		}),
		response: {
			200: t.Object({
				success: t.Boolean(),
				message: t.String(),
			}),
		},
	},
);
