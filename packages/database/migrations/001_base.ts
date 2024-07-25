import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
	await db.schema.createType("usertype").asEnum(["admin", "player"]).execute();
	await db.schema
		.createType("assetcategory")
		.asEnum([
			"avatar",
			"weapon",
			"armor",
			"accessory",
			"consumable",
			"item",
			"companion",
			"structure",
			"currency",
		])
		.execute();

	await db.schema
		.createTable("asset")
		.addColumn("id", "uuid", (col) =>
			col.primaryKey().defaultTo(sql`gen_random_uuid()`),
		)
		.addColumn("type", sql`assetcategory`, (col) => col.notNull())
		.addColumn("name", "varchar(50)", (col) => col.notNull().unique())
		.addColumn("url", "varchar(500)", (col) => col.notNull().unique())
		.execute();

	await db.schema
		.createTable("server")
		.addColumn("id", "uuid", (col) =>
			col.primaryKey().defaultTo(sql`gen_random_uuid()`),
		)
		.addColumn("name", "varchar(50)", (col) => col.notNull().unique())
		.addColumn("online", "boolean", (col) => col.notNull().defaultTo(false))
		.addColumn("updatedAt", "timestamp", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.addColumn("createdAt", "timestamp", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.execute();

	await db.schema
		.createTable("account")
		.addColumn("id", "uuid", (col) =>
			col.primaryKey().defaultTo(sql`gen_random_uuid()`),
		)
		.addColumn("email", "varchar(100)", (col) => col.notNull().unique())
		.addColumn("registrationTime", "timestamp", (col) => col.notNull())
		.addColumn("avatarAssetId", "uuid", (col) =>
			col.notNull().references("asset.id"),
		)
		.addColumn("currentServerId", "uuid", (col) => col.references("server.id"))
		.addColumn("updatedAt", "timestamp", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.execute();

	await db.schema
		.createTable("auth")
		.addColumn("accountId", "uuid", (col) =>
			col.primaryKey().references("account.id").onDelete("cascade"),
		)
		.addColumn("refreshTokenHash", "varchar(500)", (col) => col.unique())
		.addColumn("refreshTokenExpires", "timestamp")
		.addColumn("accessTokenHash", "varchar(500)", (col) => col.unique())
		.addColumn("accessTokenExpires", "timestamp")
		.execute();

	await db.schema
		.createTable("user")
		.addColumn("id", "uuid", (col) =>
			col.primaryKey().defaultTo(sql`gen_random_uuid()`),
		)
		.addColumn("name", "varchar(50)", (col) => col.unique())
		.addColumn("accountId", "uuid", (col) =>
			col.notNull().references("account.id"),
		)
		.addColumn("serverId", "uuid", (col) =>
			col.notNull().references("server.id"),
		)
		.addColumn("type", sql`usertype`, (col) =>
			col.notNull().defaultTo("player"),
		)
		.addColumn("updatedAt", "timestamp", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.addColumn("createdAt", "timestamp", (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable("user").execute();

	await db.schema.dropTable("auth").execute();
	await db.schema.dropTable("account").execute();

	await db.schema.dropTable("server").execute();
	await db.schema.dropTable("asset").execute();

	await db.schema.dropType("usertype").execute();
	await db.schema.dropType("assetcategory").execute();
}
