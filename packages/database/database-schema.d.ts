import type { ColumnType } from "kysely";

export type Assetcategory = "accessory" | "armor" | "avatar" | "companion" | "consumable" | "currency" | "item" | "structure" | "weapon";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Itemtype = "accessory" | "armor" | "companion" | "consumable" | "item" | "structure" | "weapon";

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

export interface Currency {
  assetId: string;
  createdAt: Generated<Timestamp>;
  description: string | null;
  id: Generated<string>;
  name: string;
  updatedAt: Generated<Timestamp>;
}

export interface Item {
  assetId: string;
  createdAt: Generated<Timestamp>;
  description: string | null;
  id: Generated<string>;
  name: string;
  type: Itemtype;
  updatedAt: Generated<Timestamp>;
}

export interface Server {
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  name: string;
  online: Generated<boolean>;
  updatedAt: Generated<Timestamp>;
}

export interface Skill {
  createdAt: Generated<Timestamp>;
  description: string | null;
  id: Generated<string>;
  name: string;
  updatedAt: Generated<Timestamp>;
}

export interface User {
  accountId: string;
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  name: string | null;
  serverId: string;
  type: Generated<Usertype>;
  updatedAt: Generated<Timestamp>;
}

export interface UserCurrency {
  amount: Generated<number>;
  createdAt: Generated<Timestamp>;
  currencyId: string | null;
  updatedAt: Generated<Timestamp>;
  userId: string | null;
}

export interface UserItem {
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  itemId: string | null;
  updatedAt: Generated<Timestamp>;
  userId: string | null;
}

export interface UserSkill {
  createdAt: Generated<Timestamp>;
  skillId: string | null;
  updatedAt: Generated<Timestamp>;
  userId: string | null;
  xp: Generated<number>;
}

export interface DB {
  account: Account;
  asset: Asset;
  auth: Auth;
  currency: Currency;
  item: Item;
  server: Server;
  skill: Skill;
  user: User;
  userCurrency: UserCurrency;
  userItem: UserItem;
  userSkill: UserSkill;
}
