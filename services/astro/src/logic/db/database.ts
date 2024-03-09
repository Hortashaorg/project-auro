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
    environment.DB_PASSWORD,
    environment.DB_USER,
  );

  return db;
};
