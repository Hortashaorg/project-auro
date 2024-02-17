import { promises as fs } from "fs";
import * as path from "path";
import { FileMigrationProvider, Migrator } from "kysely";
import type { MigrationResultSet } from "kysely";
import { db } from "../index";

const createMigrator = async () => {
	return new Migrator({
		db: db,
		provider: new FileMigrationProvider({
			fs,
			path,
			migrationFolder: path.join(process.cwd(), "src/backend/db/migrations"),
		}),
	});
};

const processResult = ({ error, results }: MigrationResultSet) => {
	if (results) {
		for (const it of results) {
			if (it.status === "Success") {
				console.log(
					`Migration "${it.migrationName}" was executed successfully`,
				);
			} else if (it.status === "Error") {
				console.error(`Failed to execute migration ${it.migrationName}`);
			}
		}
	}

	if (error) {
		console.error(error);
		console.error("Failed to migrate database. Terminating process.");
		process.exit(1);
	}
};

export const migrateToLatest = async () => {
	console.log("Executing db migrations");
	const migrator = await createMigrator();
	const result = await migrator.migrateToLatest();
	processResult(result);
};

export const migrateDown = async () => {
	console.log("Migrating db down");
	const migrator = await createMigrator();
	const result = await migrator.migrateDown();
	processResult(result);
};
