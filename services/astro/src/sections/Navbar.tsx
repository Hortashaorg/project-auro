import { Avatar, AvatarFallback, AvatarImage } from "@comp/shadui/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@comp/shadui/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@comp/shadui/ui/navigation-menu";
import { cn } from "@src/logic/shadui";
import React from "react";

const loginUrl = `https://dev-5g37fye485wl6b3n.eu.auth0.com/authorize?response_type=code&scope=openid%20email%20offline_access&client_id=co4niwbMW14RUu0WltdhW13TVpDUnzPY&redirect_uri=${window.location.origin}/auth/callback/login`;
const logoutUrl = `https://dev-5g37fye485wl6b3n.eu.auth0.com/v2/logout?client_id=co4niwbMW14RUu0WltdhW13TVpDUnzPY&returnTo=${window.location.origin}/auth/callback/logout`;

export const Navbar: React.FC<{
  loggedIn: boolean;
  avatarUrl: string | undefined;
}> = ({ loggedIn, avatarUrl }) => (
  <div className="flex items-center border-b p-3">
    <div className="mr-4 hidden md:flex">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <ListItem href="/" title="Home">
                  Home Page
                </ListItem>
                <ListItem href="/docs" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            {loggedIn ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar>
                      <AvatarImage
                        src={avatarUrl}
                        className="bg-muted p-1 border-2 border-black rounded-full"
                        id="avatar"
                      />
                      <AvatarFallback id="avatar">CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem asChild>
                      <a href="/profile">Profile</a>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <a href={logoutUrl} className="text-red-700">
                        Logout
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <a href={loginUrl} className={navigationMenuTriggerStyle()}>
                  Login
                </a>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  </div>
);

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
