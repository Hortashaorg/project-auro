import { getDB } from "@package/database";

let db: Awaited<ReturnType<typeof getDB>> | null;

export const initDatabase = async () => {
  if (db) {
    return db;
  }

  db = await getDB(
    import.meta.env.DB_HOST,
    import.meta.env.DB_NAME,
    import.meta.env.DB_PASSWORD,
    import.meta.env.DB_USER,
  );

  return db;
};
