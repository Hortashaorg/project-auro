import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import pkg from "pg";
import Cursor from "pg-cursor";

import type { DB } from "./database-schema";
import { enviroment } from "./environment";

const { Pool } = pkg;

export const db = new Kysely<DB>({
  // Use MysqlDialect for MySQL and SqliteDialect for SQLite.
  dialect: new PostgresDialect({
    cursor: Cursor,
    pool: new Pool({
      host: enviroment.DB_HOST,
      database: enviroment.DB_NAME,
      password: enviroment.DB_PASSWORD,
      user: enviroment.DB_USER,
      ssl: false,
    }),
  }),
  plugins: [new CamelCasePlugin()],
});
