import { hashToken, throwError } from "@package/common";
import { defineMiddleware, sequence } from "astro/middleware";

import { getDB } from "@package/database";
import { hasAccessToUrl } from "./permissions";

export const getUser = defineMiddleware(async ({ cookies, locals }, next) => {
	const accessToken = cookies.get("access_token");

	if (!accessToken) {
		locals.loggedIn = false;
	} else {
		const db = await getDB();
		const auth = await db
			.selectFrom("auth")
			.innerJoin("account", "auth.accountId", "account.id")
			.where("accessTokenHash", "=", hashToken(accessToken.value))
			.selectAll()
			.executeTakeFirst();
		if (auth) {
			locals.loggedIn = true;
			locals.account = {
				...auth,
			};

			locals.server;

			if (auth.currentServerId) {
				const server = await db
					.selectFrom("server")
					.where("id", "=", auth.currentServerId)
					.selectAll()
					.executeTakeFirstOrThrow();
				locals.server = server;

				const user = await db
					.selectFrom("user")
					.where((eb) =>
						eb.and([
							eb("accountId", "=", auth.id),
							eb("serverId", "=", auth.currentServerId),
						]),
					)
					.selectAll()
					.executeTakeFirstOrThrow();

				locals.user = user;
			}
		} else {
			locals.loggedIn = false;
		}
	}
	return next();
});

export const validation = defineMiddleware(async (context, next) => {
	const hasAccess = hasAccessToUrl(context);

	if (hasAccess) {
		return next();
	}

	if (!context.locals.loggedIn) {
		const response = new Response("Unauthorized", { status: 302 });
		response.headers.append("Location", "/");

		return response;
	}
	const response = new Response("Unauthorized", { status: 302 });
	response.headers.append("Location", "/");
	const db = await getDB();

	await db
		.updateTable("auth")
		.set({
			accessTokenExpires: null,
			accessTokenHash: null,
			refreshTokenExpires: null,
			refreshTokenHash: null,
		})
		.where(
			"accountId",
			"=",
			context.locals.account?.id ??
				throwError("Account do not exist even though user is logged in."),
		)
		.execute();

	return response;
});

export const tokenRenew = defineMiddleware(
	async ({ locals, cookies, url }, next) => {
		const refreshToken = cookies.get("refresh_token")?.value;

		if (
			!locals.loggedIn &&
			!url.pathname.startsWith("/auth/callback") &&
			refreshToken
		) {
			const response = new Response("Refreshing Token...", { status: 302 });
			response.headers.append("Location", "/auth/callback/refresh");
			return response;
		}

		return next();
	},
);

export const onRequest = sequence(getUser, validation, tokenRenew);
