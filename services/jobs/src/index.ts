import { getDB, sql } from "@package/database";
import { CronJob } from "cron";

const job = async () => {
	const db = await getDB();
	console.log("Adding turn for all users");
	await db
		.updateTable("user")
		.set({
			actions: sql`actions + 1`,
		})
		.where("actions", "<", 100)
		.execute();
};
const cronJob = new CronJob("* * * * *", job);

cronJob.start();
console.log("Cron job started");
