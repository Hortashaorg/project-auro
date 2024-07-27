import { getDB } from "../index";

export const populateDBData = async () => {
	try {
		const db = await getDB();
		await db
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

		await db
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
		await db
			.insertInto("asset")
			.values([
				{
					name: "Chest 1",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d6.png",
				},
				{
					name: "House 1",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d16.png",
				},
				{
					name: "Chest 2",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d22.png",
				},
				{
					name: "House 2",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d32.png",
				},
				{
					name: "Chest 3",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d38.png",
				},
				{
					name: "House 3",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d48.png",
				},
				{
					name: "House 4",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d65.png",
				},
				{
					name: "House 5",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d67.png",
				},
				{
					name: "Entrance 1",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d68.png",
				},
				{
					name: "Castle 1",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d69.png",
				},
				{
					name: "Tower 1",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d70.png",
				},
				{
					name: "Tree 2",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d72.png",
				},
				{
					name: "Tree 3",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d73.png",
				},
				{
					name: "Tree 4",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d74.png",
				},
				{
					name: "Tree 5",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d75.png",
				},
				{
					name: "Tree 6",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d76.png",
				},
				{
					name: "Tree 7",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d77.png",
				},
				{
					name: "Tree 8",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d78.png",
				},
				{
					name: "Tree 9",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d79.png",
				},
				{
					name: "Tree 10",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d80.png",
				},
				{
					name: "Cave 1",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d81.png",
				},
				{
					name: "Cave 2",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d82.png",
				},
				{
					name: "Mountain 1",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d83.png",
				},
				{
					name: "Entrance 2",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d88.png",
				},
				{
					name: "Mountain 2",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d91.png",
				},
				{
					name: "Mountain 3",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d92.png",
				},
				{
					name: "Mountain 4",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d93.png",
				},
				{
					name: "Mountain 5",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d94.png",
				},
				{
					name: "Mountain 6",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d95.png",
				},
				{
					name: "Forest 7",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d96.png",
				},
				{
					name: "Tower 2",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d97.png",
				},
				{
					name: "Tower 3",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d98.png",
				},
				{
					name: "House 6",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d99.png",
				},
				{
					name: "Portal 1",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d100.png",
				},
				{
					name: "Castle 2",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d101.png",
				},
				{
					name: "Tower 4",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d102.png",
				},
				{
					name: "House 7",
					type: "structure",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d144.png",
				},
			])
			.onConflict((occ) => occ.doNothing())
			.execute();

		await db
			.insertInto("asset")
			.values([
				{
					name: "Dagger 1",
					type: "weapon",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d4241.png",
				},
				{
					name: "Sword 1",
					type: "weapon",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d4249.png",
				},
				{
					name: "Sword 2",
					type: "weapon",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d4256.png",
				},
				{
					name: "Wand 1",
					type: "weapon",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d4289.png",
				},
				{
					name: "Staff 1",
					type: "weapon",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d4295.png",
				},
				{
					name: "Bow 1",
					type: "weapon",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d4314.png",
				},
				{
					name: "Sword 3",
					type: "weapon",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d4318.png",
				},
				{
					name: "Wand 2",
					type: "weapon",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d4369.png",
				},
				{
					name: "Staff 2",
					type: "weapon",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d4375.png",
				},
				{
					name: "Dagger 2",
					type: "weapon",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d4401.png",
				},
				{
					name: "Sword 4",
					type: "weapon",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d4409.png",
				},
				{
					name: "Sword 5",
					type: "weapon",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d4416.png",
				},
				{
					name: "Dagger 3",
					type: "weapon",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d4481.png",
				},
				{
					name: "Sword 6",
					type: "weapon",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d4489.png",
				},
				{
					name: "Sword 7",
					type: "weapon",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d4496.png",
				},
				{
					name: "Sword 8",
					type: "weapon",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d4961.png",
				},
				{
					name: "Sword 9",
					type: "weapon",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d4964.png",
				},
				{
					name: "Axe 1",
					type: "weapon",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d4965.png",
				},
				{
					name: "Dagger 4",
					type: "weapon",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d4966.png",
				},
				{
					name: "Staff 3",
					type: "weapon",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d4970.png",
				},
				{
					name: "Bow 2",
					type: "weapon",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d5245.png",
				},
			])
			.onConflict((occ) => occ.doNothing())
			.execute();

		await db
			.insertInto("asset")
			.values([
				{
					name: "Key 1",
					type: "accessory",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d166.png",
				},
				{
					name: "Key 2",
					type: "accessory",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d167.png",
				},
				{
					name: "Key 3",
					type: "accessory",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d219.png",
				},
				{
					name: "Key 4",
					type: "accessory",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d224.png",
				},
				{
					name: "Ring 1",
					type: "accessory",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d5315.png",
				},
				{
					name: "Ring 2",
					type: "accessory",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d5316.png",
				},
				{
					name: "Ring 3",
					type: "accessory",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d5317.png",
				},
				{
					name: "Ring 4",
					type: "accessory",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d5318.png",
				},
				{
					name: "Ring 5",
					type: "accessory",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d5319.png",
				},
				{
					name: "Necklace 1",
					type: "accessory",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d5320.png",
				},
				{
					name: "Necklace 2",
					type: "accessory",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d5321.png",
				},
				{
					name: "Necklace 3",
					type: "accessory",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d5322.png",
				},
				{
					name: "Necklace 4",
					type: "accessory",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d5323.png",
				},
				{
					name: "Necklace 5",
					type: "accessory",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d5324.png",
				},
				{
					name: "Necklace 6",
					type: "accessory",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d6465.png",
				},
				{
					name: "Necklace 7",
					type: "accessory",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d6466.png",
				},
				{
					name: "Necklace 8",
					type: "accessory",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d6467.png",
				},
				{
					name: "Necklace 9",
					type: "accessory",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d7784.png",
				},
				{
					name: "Ring 6",
					type: "accessory",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d7787.png",
				},
			])
			.onConflict((occ) => occ.doNothing())
			.execute();

		await db
			.insertInto("asset")
			.values([
				{
					name: "Coin 1",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d173.png",
				},
				{
					name: "Coin 2",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d369.png",
				},
				{
					name: "Coin 3",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d370.png",
				},
				{
					name: "Coin 4",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d371.png",
				},
				{
					name: "Coin 5",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d372.png",
				},
				{
					name: "Coin 6",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d373.png",
				},
				{
					name: "Coin 7",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d374.png",
				},
				{
					name: "Coin 8",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d375.png",
				},
				{
					name: "Coin 9",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d376.png",
				},
				{
					name: "Coin 10",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d377.png",
				},
				{
					name: "Bar 1",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d386.png",
				},
				{
					name: "Bar 2",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d387.png",
				},
				{
					name: "Bar 3",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d388.png",
				},
				{
					name: "Bar 4",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d389.png",
				},
				{
					name: "Bar 5",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d390.png",
				},
				{
					name: "Bar 6",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d391.png",
				},
				{
					name: "Bar 7",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d392.png",
				},
				{
					name: "Bar 8",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d393.png",
				},
				{
					name: "Jewel 1",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d401.png",
				},
				{
					name: "Jewel 2",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d402.png",
				},
				{
					name: "Jewel 3",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d403.png",
				},
				{
					name: "Jewel 4",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d404.png",
				},
				{
					name: "Jewel 5",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d405.png",
				},
				{
					name: "Jewel 6",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d406.png",
				},
				{
					name: "Jewel 7",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d407.png",
				},
				{
					name: "Jewel 8",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d408.png",
				},
				{
					name: "Jewel 9",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d409.png",
				},
				{
					name: "Jewel 10",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d410.png",
				},
				{
					name: "Jewel 11",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d411.png",
				},
				{
					name: "Jewel 12",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d412.png",
				},
				{
					name: "Jewel 13",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d413.png",
				},
				{
					name: "Jewel 14",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d414.png",
				},
				{
					name: "Jewel 15",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d415.png",
				},
				{
					name: "Jewel 16",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d416.png",
				},
				{
					name: "Jewel 17",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d417.png",
				},
				{
					name: "Jewel 18",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d418.png",
				},
				{
					name: "Jewel 19",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d419.png",
				},
				{
					name: "Jewel 20",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d420.png",
				},
				{
					name: "Jewel 21",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d421.png",
				},
				{
					name: "Jewel 22",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d422.png",
				},
				{
					name: "Jewel 23",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d423.png",
				},
				{
					name: "Jewel 24",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d424.png",
				},
				{
					name: "Jewel 25",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d425.png",
				},
				{
					name: "Jewel 26",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d426.png",
				},
				{
					name: "Jewel 27",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d427.png",
				},
				{
					name: "Jewel 28",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d428.png",
				},
				{
					name: "Jewel 29",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d429.png",
				},
				{
					name: "Jewel 30",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d430.png",
				},
				{
					name: "Ore 1",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d481.png",
				},
				{
					name: "Powder 1",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d482.png",
				},
				{
					name: "Wood 1",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d490.png",
				},
				{
					name: "Fur 1",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d492.png",
				},
				{
					name: "Ore 2",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d497.png",
				},
				{
					name: "Powder 2",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d498.png",
				},
				{
					name: "Ore 3",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d513.png",
				},
				{
					name: "Powder 3",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d514.png",
				},
				{
					name: "Ore 4",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d529.png",
				},
				{
					name: "Powder 4",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d530.png",
				},
				{
					name: "Ore 5",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d545.png",
				},
				{
					name: "Powder 5",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d546.png",
				},
				{
					name: "Wood 2",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d635.png",
				},
				{
					name: "Wood 3",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d667.png",
				},
				{
					name: "Wood 4",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d699.png",
				},
				{
					name: "Food 1",
					type: "currency",
					url: "https://stprojectaurodev.blob.core.windows.net/pixelart/d3115.png",
				},
			])
			.onConflict((occ) => occ.doNothing())
			.execute();
	} catch (error) {
		console.log(error);
		process.exit(0);
	} finally {
		console.log("DB populated!");
		process.exit(0);
	}
};
