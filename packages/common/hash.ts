import { createHash } from "node:crypto";

export const hashToken = (token: string) => {
	const hash = createHash("sha256");

	hash.update(token);
	const hashedToken = hash.digest("hex");

	return hashedToken;
};
