import kanel from "kanel";
import kanelKysely from "kanel-kysely";
import { environment } from "../environment";

const outFile = "./types";

async function run() {
	await kanel.processDatabase({
		connection: {
			host: environment.DB_HOST,
			database: "root",
			password: "root",
			user: environment.DB_USER,
			ssl: false,
		},
		outputPath: outFile,
		enumStyle: "type",
		preRenderHooks: [
			kanelKysely.makeKyselyHook({
				databaseFilename: "index",
				includeSchemaNameInTableName: true,
			}),
			kanelKysely.kyselyCamelCaseHook,
		],
	});
}

await run();
console.log(`Schema written to ${outFile}`);
process.exit(0);
