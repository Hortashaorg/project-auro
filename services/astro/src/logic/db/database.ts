import { getSecret } from "@package/common";
import { getDB } from "@package/database";
import { environment } from "@src/environment";

let db: Awaited<ReturnType<typeof getDB>> | null;

export const initDatabase = async () => {
  if (db) {
    return db;
  }

  db = await getDB(
    environment.DB_HOST,
    environment.DB_NAME,
    environment.NODE_ENV === "development"
      ? "root"
      : await getSecret("DB-PASSWORD", environment.KEYVAULT_NAME),
    environment.DB_USER,
  );

  return db;
};
