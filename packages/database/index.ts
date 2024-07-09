import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import pkg from "pg";
import Cursor from "pg-cursor";

import { getSecret } from "@package/common";
import type { DB } from "./database-schema";
import { environment } from "./environment";

const { Pool } = pkg;

let cachedDb: Kysely<DB> | null = null;

export const getDB = async () => {
	if (cachedDb) {
		return cachedDb;
	}

	const password =
		environment.NODE_ENV === "local"
			? "root"
			: await getSecret("DB-PASSWORD", environment.KEYVAULT_NAME, true);

	cachedDb = new Kysely<DB>({
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

export type { Insertable, Selectable } from "kysely";
