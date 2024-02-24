import { throwError } from "src/utilities";

export const enviroment = {
  DB_PASSWORD:
    import.meta.env.DB_PASSWORD ??
    throwError("env variable: DB_PASSWORD not found"),
  DB_NAME:
    import.meta.env.DB_NAME ?? throwError("env variable: DB_NAME not found"),
  DB_USER:
    import.meta.env.DB_USER ?? throwError("env variable: DB_USER not found"),
  DB_HOST:
    import.meta.env.DB_HOST ?? throwError("env variable: DB_HOST not found"),
};
