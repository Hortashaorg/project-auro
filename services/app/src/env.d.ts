/// <reference types="astro/client" />

import type { Account } from "@package/database/types/public/Account";
import type { Auth } from "@package/database/types/public/Auth";
import type { Server } from "@package/database/types/public/Server";
import type { User } from "@package/database/types/public/User";

declare global {
	namespace App {
		interface Locals {
			loggedIn: boolean;
			account?: Account & Auth;
			server?: Server;
			user?: User;
		}
	}
}
