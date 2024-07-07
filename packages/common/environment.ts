import { throwError } from "./utils";

export const environment = {
	get NODE_ENV() {
		return (
			process.env.NODE_ENV ?? throwError("env variable: NODE_ENV not found")
		);
	},
	get AZURE_TENANT_ID() {
		return (
			process.env.AZURE_TENANT_ID ??
			throwError("env variable: AZURE_TENANT_ID not found")
		);
	},
	get AZURE_SECRET() {
		return (
			process.env.AZURE_SECRET ??
			throwError("env variable: AZURE_SECRET not found")
		);
	},
	get AZURE_APP_ID() {
		return (
			process.env.AZURE_APP_ID ??
			throwError("env variable: AZURE_APP_ID not found")
		);
	},
};
