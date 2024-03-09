import { getSecret } from "@package/common";
import { environment } from "@src/environment";
import { getLoginTokens, nullifyTokensByRefreshToken } from "@src/logic/auth";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies }) => {
  const refreshToken = cookies.get("refresh_token")?.value;
  if (!refreshToken) throw Error("Something went terribly wrong.");
  const result = await fetch(
    `https://dev-5g37fye485wl6b3n.eu.auth0.com/oauth/token`,
    {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: "co4niwbMW14RUu0WltdhW13TVpDUnzPY",
        client_secret: await getSecret(
          "AUTH0-CLIENT-SECRET",
          environment.KEYVAULT_NAME,
        ),
        refresh_token: refreshToken,
        redirect_uri: "https://localhost:4321/callback",
      }),
    },
  );

  if (result.status !== 200) {
    return nullifyTokensByRefreshToken(refreshToken);
  }

  const auth = (await result.json()) as {
    access_token: string;
    refresh_token: string;
    id_token: string;
    scope: "openid email offline_access";
    expires_in: number;
    token_type: "Bearer";
  };

  return getLoginTokens(auth);
};
