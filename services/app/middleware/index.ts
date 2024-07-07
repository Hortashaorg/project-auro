import { hashToken, throwError } from "@package/common";
import { initDatabase } from "@src/logic/db/database";
import { defineMiddleware, sequence } from "astro/middleware";

import { hasAccessToUrl } from "./permissions";

/* eslint-disable no-param-reassign */
export const getUser = defineMiddleware(async ({ cookies, locals }, next) => {
	const accessToken = cookies.get("access_token");

	if (!accessToken) {
		locals.loggedIn = false;
	} else {
		const db = await initDatabase();
		const auth = await db
			.selectFrom("auth")
			.innerJoin("account", "auth.accountId", "account.id")
			.where("accessTokenHash", "=", hashToken(accessToken.value))
			.select([
				"accessTokenExpires",
				"refreshTokenExpires",
				"id",
				"accessTokenHash",
				"refreshTokenHash",
				"email",
			])
			.executeTakeFirst();
		if (auth) {
			locals.loggedIn = true;
			locals.account = {
				...auth,
			};
		} else {
			locals.loggedIn = false;
		}
	}
	return next();
});
/* eslint-enable no-param-reassign */

export const validation = defineMiddleware(async (context, next) => {
	const hasAccess = hasAccessToUrl(context);
	if (!hasAccess && !context.locals.loggedIn) {
		const response = new Response("Unauthorized", { status: 302 });
		response.headers.append("Location", "/");

		return response;
	}

	if (!hasAccess && context.locals.loggedIn) {
		const response = new Response("Unauthorized", { status: 302 });
		response.headers.append("Location", "/");
		const db = await initDatabase();

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
	}
	return next();
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
