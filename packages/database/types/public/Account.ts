// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import type { AssetId } from './Asset';
import type { ServerId } from './Server';
import type { ColumnType, Selectable, Insertable, Updateable } from 'kysely';

/** Identifier type for public.account */
export type AccountId = string & { __brand: 'AccountId' };

/** Represents the table public.account */
export default interface AccountTable {
  id: ColumnType<AccountId, AccountId | undefined, AccountId>;

  email: ColumnType<string, string, string>;

  registrationTime: ColumnType<Date, Date | string, Date | string>;

  avatarAssetId: ColumnType<AssetId, AssetId, AssetId>;

  currentServerId: ColumnType<ServerId | null, ServerId | null, ServerId | null>;

  updatedAt: ColumnType<Date, Date | string | undefined, Date | string>;
}

export type Account = Selectable<AccountTable>;

export type NewAccount = Insertable<AccountTable>;

export type AccountUpdate = Updateable<AccountTable>;
