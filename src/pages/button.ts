import { db } from "@src/backend/db"

export async function GET() {
    const data = await db.selectFrom("asset").selectAll().executeTakeFirstOrThrow();
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return new Response(data.name)
}