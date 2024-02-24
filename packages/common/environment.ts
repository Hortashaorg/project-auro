import { throwError } from "./index";

export const environment = {
  NODE_ENV:
    process.env.NODE_ENV ?? throwError("env variable: NODE_ENV not found"),
};
