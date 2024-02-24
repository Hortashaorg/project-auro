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

export const getSecret = async (secretName: string) => {
  credentials = createOrGetCredentials();
  const KEYVAULT_NAME =
    process.env.KEYVAULT_NAME ??
    throwError("env variable: KEYVAULT_NAME not found");
  const url = `https://${KEYVAULT_NAME}.vault.azure.net`;
  const client = new SecretClient(url, credentials);

  const { value } = await client.getSecret(secretName);

  return value ?? throwError(`secret: ${secretName} not found`);
};
