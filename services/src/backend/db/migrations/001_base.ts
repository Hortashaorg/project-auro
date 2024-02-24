import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createType("rarity").asEnum(["common", "uncommon", "rare", "epic", "legendary", "ancient"]).execute();
  await db.schema.createType("assettype").asEnum(["assignment", "character", "item", "resource", "skill"]).execute();
  await db.schema.createType("droptype").asEnum(["character", "item", "resource", "skill"]).execute();
  await db.schema.createType("startingtype").asEnum(["character", "item", "resource"]).execute();
  await db.schema.createType("usertype").asEnum(["admin", "player"]).execute();

  await db.schema
    .createTable("account")
    .addColumn("address", "varchar(50)", (col) => col.primaryKey())
    .execute();

  await db.schema
    .createTable("world")
    .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn("name", "varchar(50)", (col) => col.notNull().unique())
    .addColumn("online", "boolean", (col) => col.notNull().defaultTo(false))
    .execute();

  await db.schema
    .createTable("user")
    .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn("address", "varchar(50)", (col) => col.notNull().references("account.address").onDelete("cascade"))
    .addColumn("worldId", "uuid", (col) => col.notNull().references("world.id").onDelete("cascade"))
    .addColumn("turns", "integer", (col) => col.defaultTo(15).notNull())
    .addColumn("type", sql`usertype`, (col) => col.notNull().defaultTo("player"))
    .execute();

  await db.schema
    .createTable("auth")
    .addColumn("address", "varchar(50)", (col) => col.primaryKey().references("account.address").onDelete("cascade"))
    .addColumn("code", "integer", (col) => col.notNull())
    .addColumn("refreshToken", "varchar(500)")
    .addColumn("accessToken", "varchar(500)")
    .execute();

  await db.schema
    .createTable("asset")
    .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn("type", sql`assettype`, (col) => col.notNull())
    .addColumn("name", "varchar(50)", (col) => col.notNull().unique())
    .addColumn("url", "varchar(500)", (col) => col.notNull().unique())
    .execute();

  await db.schema
    .createTable("character")
    .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn("name", "varchar(50)", (col) => col.notNull())
    .addColumn("assetId", "uuid", (col) => col.notNull().references("asset.id").onDelete("cascade"))
    .addColumn("rarity", sql`rarity`, (col) => col.notNull())
    .addColumn("worldId", "uuid", (col) => col.notNull().references("world.id").onDelete("cascade"))
    .execute();

  await db.schema
    .createTable("resource")
    .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn("name", "varchar(50)", (col) => col.notNull())
    .addColumn("rarity", sql`rarity`, (col) => col.notNull())
    .addColumn("worldId", "uuid", (col) => col.notNull().references("world.id").onDelete("cascade"))
    .addColumn("assetId", "uuid", (col) => col.notNull().references("asset.id").onDelete("cascade"))
    .execute();

  await db.schema
    .createTable("assignment")
    .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn("name", "varchar(50)", (col) => col.notNull())
    .addColumn("worldId", "uuid", (col) => col.notNull().references("world.id").onDelete("cascade"))
    .addColumn("assetId", "uuid", (col) => col.notNull().references("asset.id").onDelete("cascade"))
    .execute();

  await db.schema
    .createTable("skill")
    .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn("name", "varchar(50)", (col) => col.notNull())
    .addColumn("worldId", "uuid", (col) => col.notNull().references("world.id").onDelete("cascade"))
    .addColumn("assetId", "uuid", (col) => col.notNull().references("asset.id").onDelete("cascade"))
    .execute();

  await db.schema
    .createTable("item")
    .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn("name", "varchar(50)", (col) => col.notNull())
    .addColumn("rarity", sql`rarity`, (col) => col.notNull())
    .addColumn("worldId", "uuid", (col) => col.notNull().references("world.id").onDelete("cascade"))
    .addColumn("assetId", "uuid", (col) => col.notNull().references("asset.id").onDelete("cascade"))
    .execute();

  await db.schema
    .createTable("dropTable")
    .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn("type", sql`droptype`, (col) => col.notNull())
    .addColumn("dropChance", "integer", (col) => col.notNull())
    .addColumn("minAmount", "integer", (col) => col.notNull())
    .addColumn("maxAmount", "integer", (col) => col.notNull())
    .addColumn("assignmentId", "uuid", (col) => col.notNull().references("assignment.id").onDelete("cascade"))
    .addColumn("resourceId", "uuid", (col) => col.references("resource.id").onDelete("cascade"))
    .addColumn("skillId", "uuid", (col) => col.references("skill.id").onDelete("cascade"))
    .addColumn("itemId", "uuid", (col) => col.references("item.id").onDelete("cascade"))
    .addColumn("characterId", "uuid", (col) => col.references("character.id").onDelete("cascade"))
    .execute();

  await db.schema
    .createTable("starterKit")
    .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn("worldId", "uuid", (col) => col.notNull().references("world.id").onDelete("cascade"))
    .addColumn("type", sql`startingtype`, (col) => col.notNull())
    .addColumn("amount", "integer")
    .addColumn("resourceId", "uuid", (col) => col.references("resource.id").unique().onDelete("cascade"))
    .addColumn("itemId", "uuid", (col) => col.references("item.id").onDelete("cascade"))
    .addColumn("characterId", "uuid", (col) => col.references("character.id").onDelete("cascade"))
    .execute();

  await db.schema
    .createTable("playerCharacter")
    .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn("characterId", "uuid", (col) => col.notNull().references("character.id").onDelete("cascade"))
    .addColumn("userId", "uuid", (col) => col.notNull().references("user.id").onDelete("cascade"))
    .execute();

  await db.schema
    .createTable("characterSkill")
    .addColumn("playerCharacterId", "uuid", (col) =>
      col.notNull().unique().references("playerCharacter.id").onDelete("cascade"),
    )
    .addColumn("skillId", "uuid", (col) => col.notNull().references("skill.id").onDelete("cascade"))
    .addColumn("xp", "integer", (col) => col.notNull().defaultTo(0))
    .execute();

  await db.schema
    .createTable("playerItem")
    .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn("itemId", "uuid", (col) => col.notNull().references("item.id").onDelete("cascade"))
    .addColumn("userId", "uuid", (col) => col.notNull().references("user.id").onDelete("cascade"))
    .execute();

  await db.schema
    .createTable("playerResource")
    .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn("resourceId", "uuid", (col) => col.notNull().references("resource.id").onDelete("cascade"))
    .addColumn("userId", "uuid", (col) => col.notNull().references("user.id").onDelete("cascade"))
    .addColumn("amount", "integer", (col) => col.notNull().defaultTo(0))
    .execute();

  await db.schema
    .createTable("characterAssignment")
    .addColumn("assignmentId", "uuid", (col) => col.notNull().references("assignment.id").onDelete("cascade"))
    .addColumn("characterId", "uuid", (col) =>
      col.notNull().unique().references("playerCharacter.id").onDelete("cascade"),
    )
    .execute();

  await db.schema
    .createTable("turnHistory")
    .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn("timestamp", "timestamp", (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn("userId", "uuid", (col) => col.notNull().references("user.id").onDelete("cascade"))
    .execute();

  await db.schema
    .createTable("lootHistory")
    .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn("timestamp", "timestamp", (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn("dropTableId", "uuid", (col) => col.notNull().references("dropTable.id").onDelete("cascade"))
    .addColumn("turnHistoryId", "uuid", (col) => col.notNull().references("turnHistory.id").onDelete("cascade"))
    .addColumn("playerCharacterId", "uuid", (col) => col.notNull().references("playerCharacter.id").onDelete("cascade"))
    .addColumn("amount", "integer", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("lootHistory").execute();
  await db.schema.dropTable("turnHistory").execute();
  await db.schema.dropTable("playerResource").execute();
  await db.schema.dropTable("characterAssignment").execute();
  await db.schema.dropTable("playerItem").execute();
  await db.schema.dropTable("characterSkill").execute();
  await db.schema.dropTable("playerCharacter").execute();

  await db.schema.dropTable("dropTable").execute();
  await db.schema.dropTable("starterKit").execute();

  await db.schema.dropTable("item").execute();
  await db.schema.dropTable("skill").execute();
  await db.schema.dropTable("character").execute();
  await db.schema.dropTable("auth").execute();
  await db.schema.dropTable("assignment").execute();
  await db.schema.dropTable("resource").execute();
  await db.schema.dropTable("user").execute();
  await db.schema.dropTable("asset").execute();
  await db.schema.dropTable("world").execute();
  await db.schema.dropTable("account").execute();

  await db.schema.dropType("droptype").execute();
  await db.schema.dropType("startingtype").execute();
  await db.schema.dropType("assettype").execute();
  await db.schema.dropType("rarity").execute();
  await db.schema.dropType("usertype").execute();
}
