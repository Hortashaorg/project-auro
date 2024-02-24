import { db } from "src/backend/db";

export async function GET() {
  const data = await db
    .selectFrom("asset")
    .selectAll()
    .executeTakeFirstOrThrow();
  return new Response(data.name);
}
