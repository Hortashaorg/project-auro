// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import type { AssetId } from './Asset';
import type { ColumnType, Selectable, Insertable, Updateable } from 'kysely';

/** Identifier type for public.currency */
export type CurrencyId = string & { __brand: 'CurrencyId' };

/** Represents the table public.currency */
export default interface CurrencyTable {
  id: ColumnType<CurrencyId, CurrencyId | undefined, CurrencyId>;

  name: ColumnType<string, string, string>;

  description: ColumnType<string | null, string | null, string | null>;

  assetId: ColumnType<AssetId, AssetId, AssetId>;

  createdAt: ColumnType<Date, Date | string | undefined, Date | string>;

  updatedAt: ColumnType<Date, Date | string | undefined, Date | string>;
}

export type Currency = Selectable<CurrencyTable>;

export type NewCurrency = Insertable<CurrencyTable>;

export type CurrencyUpdate = Updateable<CurrencyTable>;