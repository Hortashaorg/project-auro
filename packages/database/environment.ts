import { throwError } from "@package/common";

export const environment = {
  get DB_PASSWORD() {
    return (
      process.env.DB_PASSWORD ??
      throwError("env variable: DB_PASSWORD not found")
    );
  },
  get DB_NAME() {
    return process.env.DB_NAME ?? throwError("env variable: DB_NAME not found");
  },
  get DB_USER() {
    return process.env.DB_USER ?? throwError("env variable: DB_USER not found");
  },
  get DB_HOST() {
    return process.env.DB_HOST ?? throwError("env variable: DB_HOST not found");
  },
};
