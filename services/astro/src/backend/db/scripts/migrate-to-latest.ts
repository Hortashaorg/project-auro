import { migrateToLatest } from ".";

await migrateToLatest()
  .then(() => console.log("Database successfully migrated to latest"))
  .catch((error) => console.error(error));

process.exit(0);
