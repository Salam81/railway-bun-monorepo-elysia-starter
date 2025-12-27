import { api } from "./api";

/**
 * Type-safe form data extracted from the API endpoint.
 */
type FormData = NonNullable<Parameters<typeof api.form.submit.post>[0]>;

/**
 * Submits form data to the backend API.
 *
 * @param form - The form data to submit
 * @throws Rejects with error if the API call fails
 */
export async function submitForm(form: FormData) {
	const { data, error } = await api.form.submit.post(form);

	if (error) {
		return Promise.reject(error.value);
	}

	return data;
}
