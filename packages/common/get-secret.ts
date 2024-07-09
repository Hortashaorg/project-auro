import {
	ClientSecretCredential,
	DefaultAzureCredential,
	type TokenCredential,
} from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

import { environment } from "./environment";
import { throwError } from "./utils";

let credentials: TokenCredential;

export const createOrGetCredentials = (isLocal = false) => {
	if (!credentials) {
		if (environment.NODE_ENV === "local" || isLocal) {
			credentials = new DefaultAzureCredential();
		} else {
			credentials = new ClientSecretCredential(
				environment.AZURE_TENANT_ID,
				environment.AZURE_APP_ID,
				environment.AZURE_SECRET,
			);
		}
	}
	return credentials;
};

export const getSecret = async (secretName: string, keyvaultName: string) => {
	console.log(process.env.FROM_LOCAL === "true");
	credentials = createOrGetCredentials(process.env.FROM_LOCAL === "true");

	const url = `https://${keyvaultName}.vault.azure.net`;
	const client = new SecretClient(url, credentials);

	const { value } = await client.getSecret(secretName);

	return value ?? throwError(`secret: ${secretName} not found`);
};
