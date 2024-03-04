import { hashToken } from "@package/common";
import { initDatabase } from "@src/database";
import type { APIRoute } from "astro";
import { decodeJwt } from "jose";

export const GET: APIRoute = async ({ url }) => {
  const code = url.searchParams.get("code");
  if (!code) throw Error("Something went terribly wrong.");

  const result = await fetch(
    `https://dev-5g37fye485wl6b3n.eu.auth0.com/oauth/token`,
    {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: "co4niwbMW14RUu0WltdhW13TVpDUnzPY",
        client_secret:
          "s8WNp0tE31dD6Z6PHae_c0xBTULISHXvntbO-VadXFSz2gh4b7WW7moNzD-YWhZ7",
        code,
        redirect_uri: "https://localhost:4321/callback",
      }),
    },
  );
  const auth = (await result.json()) as {
    access_token: string;
    refresh_token: string;
    id_token: string;
    scope: "openid email offline_access";
    expires_in: number;
    token_type: "Bearer";
  };

  const idTokenClaims = decodeJwt<{
    email: string;
  }>(auth.id_token);

  const db = await initDatabase();
  let account = await db
    .insertInto("account")
    .values({
      email: idTokenClaims.email,
      registrationTime: new Date(),
    })
    .onConflict((occ) => occ.column("email").doNothing())
    .returningAll()
    .executeTakeFirst();

  if (!account) {
    account = await db
      .selectFrom("account")
      .where("email", "=", idTokenClaims.email)
      .selectAll()
      .executeTakeFirst();
  }

  if (!account) throw Error("Account not found and was unable to create");

  await db
    .insertInto("auth")
    .values({
      accountId: account.id,
      accessTokenHash: hashToken(auth.access_token),
      accessTokenExpires: new Date(Date.now() + auth.expires_in * 1000),
      refreshTokenHash: hashToken(auth.refresh_token),
      refreshTokenExpires: new Date(Date.now() + 2592000 * 1000),
    })
    .onConflict((occ) =>
      occ.column("accountId").doUpdateSet({
        accessTokenHash: hashToken(auth.access_token),
        accessTokenExpires: new Date(Date.now() + auth.expires_in * 1000),
        refreshTokenHash: hashToken(auth.refresh_token),
        refreshTokenExpires: new Date(Date.now() + 2592000 * 1000),
      }),
    )
    .execute();

  const response = new Response("Logging in...", { status: 302 });
  response.headers.append("Location", "/");
  response.headers.append(
    "Set-Cookie",
    `access_token=${auth.access_token}; Max-Age=${auth.expires_in}; HttpOnly; SameSite=Strict; Secure; Path=/;`,
  );
  response.headers.append(
    "Set-Cookie",
    `refresh_token=${auth.refresh_token}; Max-Age=2592000; HttpOnly; SameSite=Strict; Secure; Path=/;`,
  );
  return response;
};
