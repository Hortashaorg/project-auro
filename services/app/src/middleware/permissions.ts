import type { APIContext } from "astro";

const isLoggedIn = ({ locals }: APIContext) => locals.loggedIn;
const isPublic = () => true;
const isAdmin = ({ locals }: APIContext) => locals.user?.type === "admin";

const paths = [
	{
		url: "/profile",
		permission: isLoggedIn,
	},
	{
		url: "/api",
		permission: isLoggedIn,
	},
	{
		url: "/",
		permission: isPublic,
	},
	{
		url: "/auth",
		permission: isPublic,
	},
	{
		url: "/admin",
		permission: isAdmin,
	},
	{
		url: "/api/admin",
		permission: isAdmin,
	},
];

export const hasAccessToUrl = (context: APIContext) => {
	const foundPaths = paths.filter((p) =>
		context.url.pathname.startsWith(p.url),
	);
	if (foundPaths.length > 0) {
		for (const path of foundPaths) {
			if (!path.permission(context)) {
				return false;
			}
		}
		return true;
	}

	// If there is no permission set for the path, we assume it's public
	return false;
};
