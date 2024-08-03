import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.createType("itemtype")
		.asEnum([
			"weapon",
			"armor",
			"accessory",
			"consumable",
			"item",
			"companion",
			"structure",
		])
		.execute();

	await db.schema
		.createTable("skill")
		.addColumn("id", "uuid", (col) =>
			col.primaryKey().defaultTo(sql`gen_random_uuid()`),
		)
		.addColumn("name", "varchar(50)", (col) => col.notNull().unique())
		.addColumn("description", "varchar(50)")
		.addColumn("updatedAt", "timestamp", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.addColumn("createdAt", "timestamp", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.execute();

	await db.schema
		.createTable("userSkill")
		.addColumn("userId", "uuid")
		.addColumn("skillId", "uuid")
		.addColumn("xp", "integer", (col) => col.notNull().defaultTo(0))
		.addColumn("updatedAt", "timestamp", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.addColumn("createdAt", "timestamp", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.execute();

	await db.schema
		.createTable("item")
		.addColumn("id", "uuid", (col) =>
			col.primaryKey().defaultTo(sql`gen_random_uuid()`),
		)
		.addColumn("name", "varchar(50)", (col) => col.notNull().unique())
		.addColumn("description", "varchar(50)")
		.addColumn("type", sql`itemtype`, (col) => col.notNull())
		.addColumn("assetId", "uuid", (col) => col.notNull().references("asset.id"))
		.addColumn("createdAt", "timestamp", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.addColumn("updatedAt", "timestamp", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.execute();

	await db.schema
		.createTable("userItem")
		.addColumn("id", "uuid", (col) =>
			col.primaryKey().defaultTo(sql`gen_random_uuid()`),
		)
		.addColumn("userId", "uuid")
		.addColumn("itemId", "uuid")
		.addColumn("updatedAt", "timestamp", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.addColumn("createdAt", "timestamp", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.execute();

	await db.schema
		.createTable("currency")
		.addColumn("id", "uuid", (col) =>
			col.primaryKey().defaultTo(sql`gen_random_uuid()`),
		)
		.addColumn("name", "varchar(50)", (col) => col.notNull().unique())
		.addColumn("description", "varchar(50)")
		.addColumn("assetId", "uuid", (col) => col.notNull().references("asset.id"))
		.addColumn("createdAt", "timestamp", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.addColumn("updatedAt", "timestamp", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.execute();

	await db.schema
		.createTable("userCurrency")
		.addColumn("userId", "uuid")
		.addColumn("currencyId", "uuid")
		.addColumn("amount", "integer", (col) => col.notNull().defaultTo(0))
		.addColumn("updatedAt", "timestamp", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.addColumn("createdAt", "timestamp", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.execute();

	await db.schema
		.createTable("location")
		.addColumn("id", "uuid", (col) =>
			col.primaryKey().defaultTo(sql`gen_random_uuid()`),
		)
		.addColumn("name", "varchar(50)", (col) => col.notNull())
		.addColumn("description", "text")
		.addColumn("available", "boolean", (col) => col.notNull().defaultTo(false))
		.addColumn("assetId", "uuid", (col) => col.notNull().references("asset.id"))
		.addColumn("serverId", "uuid", (col) =>
			col.notNull().references("server.id"),
		)
		.addColumn("createdAt", "timestamp", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.addColumn("updatedAt", "timestamp", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable("userSkill").execute();
	await db.schema.dropTable("userItem").execute();
	await db.schema.dropTable("userCurrency").execute();

	await db.schema.dropTable("skill").execute();
	await db.schema.dropTable("item").execute();
	await db.schema.dropTable("currency").execute();

	await db.schema.dropType("itemtype").execute();
	await db.schema.dropTable("location").execute();
}
