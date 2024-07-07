import { migrateDown } from ".";

await migrateDown()
	.then(() =>
		console.log("Database successfully downgraded to previous version"),
	)
	.catch((error) => console.error(error));

process.exit(0);
