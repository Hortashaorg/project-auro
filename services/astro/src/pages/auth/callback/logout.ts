import { nullifyTokensByRefreshToken } from "@src/logic/auth";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies }) => {
  const refreshToken = cookies.get("refresh_token")?.value;

  if (refreshToken) {
    return nullifyTokensByRefreshToken(refreshToken);
  }

  // Can't logout since no refresh token is found
  return new Response("No refresh token found, redirecting", {
    status: 302,
    headers: {
      Location: "/",
    },
  });
};
