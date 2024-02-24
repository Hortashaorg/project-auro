import { initDatabase } from "@src/database";

export async function GET() {
  const db = await initDatabase();
  const data = await db
    .selectFrom("asset")
    .selectAll()
    .executeTakeFirstOrThrow();
  return new Response(data.name);
}
