import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import pkg from "pg";
import Cursor from "pg-cursor";

import { getSecret } from "@package/common";
import type { DB } from "./database-schema";
import { environment } from "./environment";

const { Pool } = pkg;

let cachedDb: Kysely<DB> | null = null;

export const getDB = async (
  DB_HOST?: string,
  DB_NAME?: string,
  DB_PASSWORD?: string,
  DB_USER?: string,
) => {
  if (cachedDb) {
    return cachedDb;
  }

  const password = DB_PASSWORD
    ? DB_PASSWORD
    : environment.NODE_ENV === "development"
      ? "root"
      : await getSecret("DB-PASSWORD", environment.KEYVAULT_NAME);

  cachedDb = new Kysely<DB>({
    dialect: new PostgresDialect({
      cursor: Cursor,
      pool: new Pool({
        host: DB_HOST ?? environment.DB_HOST,
        database: DB_NAME ?? environment.DB_NAME,
        password: password,
        user: DB_USER ?? environment.DB_USER,
        ssl: false,
      }),
    }),
    plugins: [new CamelCasePlugin()],
  });

  return cachedDb;
};
