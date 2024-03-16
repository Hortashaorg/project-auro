import { getSecret, throwError } from "@package/common";
import { environment } from "@src/environment";
import { getLoginTokens } from "@src/logic/auth/auth";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
  const code = url.searchParams.get("code");

  console.log(url);
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
        client_secret: await getSecret(
          "AUTH0-CLIENT-SECRET",
          environment.KEYVAULT_NAME,
        ),
        code,
        redirect_uri: `${url.origin}/callback`,
      }),
    },
  );

  if (result.status !== 200) {
    throwError("Authentication failed when trying to login.");
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
