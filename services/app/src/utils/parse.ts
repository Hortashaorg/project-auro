export const parseFormData = async (request: Request) => {
	const data: Record<string, string> = {};

	const formData = await request.formData();
	for (const [key, value] of formData.entries()) {
		data[key] = value as string;
	}

	return data;
};
