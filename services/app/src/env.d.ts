/// <reference types="astro/client" />

import type { Selectable } from "@package/database";
import type {
	Account,
	Auth,
	Server,
	User,
} from "@package/database/database-schema";

declare global {
	namespace App {
		interface Locals {
			loggedIn: boolean;
			account?: Selectable<Account> & Selectable<Auth>;
			server?: Selectable<Server>;
			user?: Selectable<User>;
		}
	}
}
