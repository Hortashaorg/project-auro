import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
  return new Response(
    JSON.stringify({
      id: params.id,
    }),
    { status: 302 },
  );
};
