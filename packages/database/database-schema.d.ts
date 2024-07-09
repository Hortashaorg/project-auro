import type { ColumnType } from "kysely";

export type Assetcategory = "avatar";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Usertype = "admin" | "player";

export interface Account {
  avatarAssetId: string;
  currentServerId: string | null;
  email: string;
  id: Generated<string>;
  registrationTime: Timestamp;
  updatedAt: Generated<Timestamp>;
}

export interface Asset {
  id: Generated<string>;
  name: string;
  type: Assetcategory;
  url: string;
}

export interface Auth {
  accessTokenExpires: Timestamp | null;
  accessTokenHash: string | null;
  accountId: string;
  refreshTokenExpires: Timestamp | null;
  refreshTokenHash: string | null;
}

export interface Server {
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  name: string;
  online: Generated<boolean>;
  updatedAt: Generated<Timestamp>;
}

export interface User {
  accountId: string;
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  serverId: string;
  type: Generated<Usertype>;
  updatedAt: Generated<Timestamp>;
}

export interface DB {
  account: Account;
  asset: Asset;
  auth: Auth;
  server: Server;
  user: User;
}
