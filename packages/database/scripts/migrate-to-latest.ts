import { migrateToLatest } from ".";
import { populateDBData } from "./populate";

await migrateToLatest()
	.then(() => console.log("Database successfully migrated to latest"))
	.catch((error) => console.error(error));

await populateDBData();
process.exit(0);
