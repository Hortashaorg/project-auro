import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import pkg from "pg";
import Cursor from "pg-cursor";

import { getSecret } from "@package/common";
import { environment } from "./environment";
import type Database from "./types";

const { Pool } = pkg;

let cachedDb: Kysely<Database> | null = null;

export const getDB = async () => {
	if (cachedDb) {
		return cachedDb;
	}

	const password =
		environment.NODE_ENV === "local"
			? "root"
			: await getSecret("DB-PASSWORD", environment.KEYVAULT_NAME);

	cachedDb = new Kysely<Database>({
		dialect: new PostgresDialect({
			cursor: Cursor,
			pool: new Pool({
				host: environment.DB_HOST,
				database: environment.DB_NAME,
				password: password,
				user: environment.DB_USER,
				ssl: false,
			}),
		}),
		plugins: [new CamelCasePlugin()],
	});

	return cachedDb;
};

export { sql } from "kysely";
export type { Insertable, Selectable } from "kysely";
