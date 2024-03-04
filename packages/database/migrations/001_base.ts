import { Kysely, sql } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema.createType("usertype").asEnum(["admin", "player"]).execute();

  await db.schema
    .createTable("account")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("email", "varchar(100)", (col) => col.notNull().unique())
    .addColumn("registrationTime", "timestamp", (col) => col.notNull())
    .addColumn("updatedAt", "timestamp", (col) =>
      col.notNull().defaultTo("now()"),
    )
    .addColumn("createdAt", "timestamp", (col) =>
      col.notNull().defaultTo("now()"),
    )
    .execute();

  await db.schema
    .createTable("auth")
    .addColumn("accountId", "uuid", (col) =>
      col.primaryKey().references("account.id").onDelete("cascade"),
    )
    .addColumn("code", "integer", (col) => col.notNull())
    .addColumn("refreshTokenHash", "varchar(500)")
    .addColumn("refreshTokenExpires", "timestamp")
    .addColumn("accessTokenHash", "varchar(500)")
    .addColumn("accessTokenExpires", "timestamp")
    .execute();

  await db.schema
    .createTable("server")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn("name", "varchar(50)", (col) => col.notNull().unique())
    .addColumn("online", "boolean", (col) => col.notNull().defaultTo(false))
    .addColumn("updatedAt", "timestamp", (col) =>
      col.notNull().defaultTo("now()"),
    )
    .addColumn("createdAt", "timestamp", (col) =>
      col.notNull().defaultTo("now()"),
    )
    .execute();

  await db.schema
    .createTable("user")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
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
      col.notNull().defaultTo("now()"),
    )
    .addColumn("createdAt", "timestamp", (col) =>
      col.notNull().defaultTo("now()"),
    )
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropTable("user").execute();
  await db.schema.dropTable("server").execute();

  await db.schema.dropTable("auth").execute();
  await db.schema.dropTable("account").execute();

  await db.schema.dropType("usertype").execute();
}
