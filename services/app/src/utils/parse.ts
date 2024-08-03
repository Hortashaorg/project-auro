import type { z } from "astro/zod";
import type { FormErrors } from "./types";

export const parseFormData = async (request: Request) => {
	const data: Record<string, string> = {};

	const formData = await request.formData();
	for (const [key, value] of formData.entries()) {
		data[key] = value as string;
	}

	return data;
};

export const validateFormData = async (
	params: unknown,
	schema: z.ZodTypeAny,
) => {
	const errors: FormErrors = {};

	const result = schema.safeParse(params);

	if (result.error) {
		for (const error of result.error.errors) {
			errors[error.path[0] as string] = {
				message: error.message,
			};
		}
	}

	return {
		success: result.success,
		errors,
	};
};
