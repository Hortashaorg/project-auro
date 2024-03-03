import type { APIRoute } from "astro";

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

  return new Response("Logging in...", {
    status: 302,
    headers: {
      Location: "/",
      "Set-Cookie": `access_token=${auth.access_token}; Max-Age=${auth.expires_in}; HttpOnly; SameSite=Strict; Secure; Path=/;`,
    },
  });
};
