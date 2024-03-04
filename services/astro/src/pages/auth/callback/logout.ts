import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  // Get current refresh token and access token
  // Hash the tokens
  // Find auth record with matching tokens
  // Nullify the record.
  const response = new Response("Logging out...", { status: 302 });
  response.headers.append("Location", "/");
  response.headers.append(
    "Set-Cookie",
    `access_token="invalid"; Max-Age=0; HttpOnly; SameSite=Strict; Secure; Path=/;`,
  );

  response.headers.append(
    "Set-Cookie",
    `refresh_token="invalid"; Max-Age=0; HttpOnly; SameSite=Strict; Secure; Path=/;`,
  );
  return response;
};
