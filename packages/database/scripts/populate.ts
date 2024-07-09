import { getDB } from "../index";

export const populateDBData = async () => {
	try {
		const db = await getDB();
		await db.transaction().execute(async (trx) => {
			await trx
				.insertInto("asset")
				.values([
					{
						name: "Human",
						type: "avatar",
						url: "https://stprojectaurodev.blob.core.windows.net/avatars/49.png",
					},
					{
						name: "Orc",
						type: "avatar",
						url: "https://stprojectaurodev.blob.core.windows.net/avatars/50.png",
					},
					{
						name: "Elf",
						type: "avatar",
						url: "https://stprojectaurodev.blob.core.windows.net/avatars/51.png",
					},
					{
						name: "Cow Red",
						type: "avatar",
						url: "https://stprojectaurodev.blob.core.windows.net/avatars/52.png",
					},
					{
						name: "Dwarf",
						type: "avatar",
						url: "https://stprojectaurodev.blob.core.windows.net/avatars/54.png",
					},
					{
						name: "Squid",
						type: "avatar",
						url: "https://stprojectaurodev.blob.core.windows.net/avatars/55.png",
					},
					{
						name: "Elf Tanned",
						type: "avatar",
						url: "https://stprojectaurodev.blob.core.windows.net/avatars/57.png",
					},
					{
						name: "Human Tanned",
						type: "avatar",
						url: "https://stprojectaurodev.blob.core.windows.net/avatars/58.png",
					},
					{
						name: "Dwarf Tanned",
						type: "avatar",
						url: "https://stprojectaurodev.blob.core.windows.net/avatars/59.png",
					},
					{
						name: "Cow Green",
						type: "avatar",
						url: "https://stprojectaurodev.blob.core.windows.net/avatars/60.png",
					},
					{
						name: "Cow Brown",
						type: "avatar",
						url: "https://stprojectaurodev.blob.core.windows.net/avatars/62.png",
					},
				])
				.onConflict((occ) => occ.doNothing())
				.execute();
		});

		await db.transaction().execute(async (trx) => {
			// Populate Servers
			await trx
				.insertInto("server")
				.values([
					{
						name: "Test Server",
						online: true,
					},
					{
						name: "Test Server 2",
						online: false,
					},
				])
				.onConflict((occ) => occ.doNothing())
				.execute();
		});
	} catch (error) {
		console.log(error);
		process.exit(0);
	} finally {
		console.log("DB populated!");
		process.exit(0);
	}
};
