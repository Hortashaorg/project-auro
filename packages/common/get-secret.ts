import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

import { throwError } from "./utils";

let credentials: DefaultAzureCredential | undefined;

export const createOrGetCredentials = () => {
  if (!credentials) {
    credentials = new DefaultAzureCredential();
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
