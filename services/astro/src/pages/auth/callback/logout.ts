import type { APIRoute } from "astro";

export const GET: APIRoute = async () =>
  new Response("Logging out...", {
    status: 302,
    headers: {
      Location: "/",
      "Set-Cookie": `access_token="invalid"; Max-Age=0; HttpOnly; SameSite=Strict; Secure; Path=/;`,
    },
  });
