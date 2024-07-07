import type { ColumnType } from "kysely";

export type Assetcategory = "avatar";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
	? ColumnType<S, I | undefined, U>
	: ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Usertype = "admin" | "player";

export interface Account {
	id: Generated<string>;
	email: string;
	registrationTime: Timestamp;
	avatarAssetId: string;
	updatedAt: Generated<Timestamp>;
}

export interface Asset {
	id: Generated<string>;
	type: Assetcategory;
	name: string;
	url: string;
}

export interface Auth {
	accountId: string;
	refreshTokenHash: string | null;
	refreshTokenExpires: Timestamp | null;
	accessTokenHash: string | null;
	accessTokenExpires: Timestamp | null;
}

export interface Server {
	id: Generated<string>;
	name: string;
	online: Generated<boolean>;
	updatedAt: Generated<Timestamp>;
	createdAt: Generated<Timestamp>;
}

export interface User {
	id: Generated<string>;
	accountId: string;
	serverId: string;
	type: Generated<Usertype>;
	updatedAt: Generated<Timestamp>;
	createdAt: Generated<Timestamp>;
}

export interface DB {
	account: Account;
	asset: Asset;
	auth: Auth;
	server: Server;
	user: User;
}
