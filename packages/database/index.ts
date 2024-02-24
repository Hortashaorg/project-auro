import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import pkg from "pg";
import Cursor from "pg-cursor";

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

  cachedDb = new Kysely<DB>({
    // Use MysqlDialect for MySQL and SqliteDialect for SQLite.
    dialect: new PostgresDialect({
      cursor: Cursor,
      pool: new Pool({
        host: DB_HOST ?? environment.DB_HOST,
        database: DB_NAME ?? environment.DB_NAME,
        password: DB_PASSWORD ?? environment.DB_PASSWORD,
        user: DB_USER ?? environment.DB_USER,
        ssl: false,
      }),
    }),
    plugins: [new CamelCasePlugin()],
  });

  return cachedDb;
};
