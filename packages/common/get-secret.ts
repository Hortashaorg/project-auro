import {
  ClientSecretCredential,
  DefaultAzureCredential,
  type TokenCredential,
} from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

import { environment } from "./environment";
import { throwError } from "./utils";

let credentials: TokenCredential;

export const createOrGetCredentials = () => {
  if (!credentials) {
    if (environment.NODE_ENV === "development") {
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
  credentials = createOrGetCredentials();

  const url = `https://${keyvaultName}.vault.azure.net`;
  const client = new SecretClient(url, credentials);

  const { value } = await client.getSecret(secretName);

  return value ?? throwError(`secret: ${secretName} not found`);
};
