import { throwError } from "@package/common";

export const environment = {
	get DB_HOST() {
		return process.env.DB_HOST ?? throwError("env variable: DB_HOST not found");
	},
	get DB_NAME() {
		return process.env.DB_NAME ?? throwError("env variable: DB_NAME not found");
	},
	get DB_USER() {
		return process.env.DB_USER ?? throwError("env variable: DB_USER not found");
	},
	get KEYVAULT_NAME() {
		return (
			process.env.KEYVAULT_NAME ??
			throwError("env variable: KEYVAULT_NAME not found")
		);
	},
	get NODE_ENV() {
		return (
			process.env.NODE_ENV ?? throwError("env variable: NODE_ENV not found")
		);
	},
};
