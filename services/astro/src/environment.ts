import { throwError } from "@package/common";

export const environment = {
  get DB_HOST() {
    return (
      import.meta.env.DB_HOST ?? throwError("env variable: DB_HOST not found")
    );
  },
  get DB_NAME() {
    return (
      import.meta.env.DB_NAME ?? throwError("env variable: DB_NAME not found")
    );
  },
  get DB_PASSWORD() {
    return (
      import.meta.env.DB_PASSWORD ??
      throwError("env variable: DB_PASSWORD not found")
    );
  },
  get DB_USER() {
    return (
      import.meta.env.DB_USER ?? throwError("env variable: DB_USER not found")
    );
  },
  get KEYVAULT_NAME() {
    return (
      import.meta.env.DB_USER ??
      throwError("env variable: KEYVAULT_NAME not found")
    );
  },
};
