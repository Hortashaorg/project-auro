import type { APIContext } from "astro";

const isLoggedIn = ({ locals }: APIContext) => locals.loggedIn;

const paths = [
  {
    url: "/secure",
    permission: isLoggedIn,
  },
];

export const hasAccessToUrl = (context: APIContext) => {
  const foundPath = paths.find((p) => p.url === context.url.pathname);
  if (foundPath) {
    return foundPath.permission(context);
  }

  // If there is no permission set for the path, we assume it's public
  return true;
};
