import { hashToken } from "@package/common";
import { initDatabase } from "@src/database";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies }) => {
  const accessToken = cookies.get("access_token");
  const refreshToken = cookies.get("access_token");

  const db = await initDatabase();

  accessToken?.value;
  await db
    .updateTable("auth")
    .set({
      accessTokenHash: null,
      accessTokenExpires: null,
      refreshTokenHash: null,
      refreshTokenExpires: null,
    })
    .where((eb) =>
      eb.or([
        eb("accessTokenHash", "=", hashToken(accessToken?.value ?? "invalid")),
        eb(
          "refreshTokenHash",
          "=",
          hashToken(refreshToken?.value ?? "invalid"),
        ),
      ]),
    )
    .execute();

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
