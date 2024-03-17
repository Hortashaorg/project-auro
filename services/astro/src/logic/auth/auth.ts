import { hashToken } from "@package/common";
import { initDatabase } from "@src/logic/db/database";
import { decodeJwt } from "jose";

interface AuthTokenInfo {
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires_in: number;
  token_type: "Bearer";
}

export const getLoginTokens = async (
  tokenInfo: AuthTokenInfo,
  redirectURL = "/auth/loading",
) => {
  const idTokenClaims = decodeJwt<{
    email: string;
  }>(tokenInfo.id_token);

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

  // Update or insert auth tokens
  await db
    .insertInto("auth")
    .values({
      accountId: account.id,
      accessTokenHash: hashToken(tokenInfo.access_token),
      accessTokenExpires: new Date(Date.now() + tokenInfo.expires_in * 1000),
      refreshTokenHash: hashToken(tokenInfo.refresh_token),
      refreshTokenExpires: new Date(Date.now() + 2592000 * 1000),
    })
    .onConflict((occ) =>
      occ.column("accountId").doUpdateSet({
        accessTokenHash: hashToken(tokenInfo.access_token),
        accessTokenExpires: new Date(Date.now() + tokenInfo.expires_in * 1000),
        refreshTokenHash: hashToken(tokenInfo.refresh_token),
        refreshTokenExpires: new Date(Date.now() + 2592000 * 1000),
      }),
    )
    .execute();

  // Generate and return the response object with cookies
  const response = new Response(`Fetching tokens`, { status: 302 });
  response.headers.append("Location", redirectURL);
  response.headers.append(
    "Set-Cookie",
    `access_token=${tokenInfo.access_token}; Max-Age=${tokenInfo.expires_in}; HttpOnly; SameSite=Strict; Secure; Path=/;`,
  );
  response.headers.append(
    "Set-Cookie",
    `refresh_token=${tokenInfo.refresh_token}; Max-Age=2592000; HttpOnly; SameSite=Strict; Secure; Path=/;`,
  );

  return response;
};

export const nullifyTokensByRefreshToken = async (
  refreshToken: string,
  redirectURL = "/",
) => {
  const db = await initDatabase();
  const hashedRefreshToken = hashToken(refreshToken);

  await db
    .updateTable("auth")
    .set({
      accessTokenHash: null,
      accessTokenExpires: null,
      refreshTokenHash: null,
      refreshTokenExpires: null,
    })
    .where("refreshTokenHash", "=", hashedRefreshToken)
    .execute();

  const response = new Response("Logging out...", { status: 302 });
  response.headers.append("Location", redirectURL);
  response.headers.append(
    "Set-Cookie",
    `access_token=; Max-Age=0; HttpOnly; SameSite=Strict; Secure; Path=/;`,
  );
  response.headers.append(
    "Set-Cookie",
    `refresh_token=; Max-Age=0; HttpOnly; SameSite=Strict; Secure; Path=/;`,
  );

  return response;
};
