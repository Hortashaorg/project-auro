// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import type { default as Assetcategory } from './Assetcategory';
import type { ColumnType, Selectable, Insertable, Updateable } from 'kysely';

/** Identifier type for public.asset */
export type AssetId = string & { __brand: 'AssetId' };

/** Represents the table public.asset */
export default interface AssetTable {
  id: ColumnType<AssetId, AssetId | undefined, AssetId>;

  type: ColumnType<Assetcategory, Assetcategory, Assetcategory>;

  name: ColumnType<string, string, string>;

  url: ColumnType<string, string, string>;
}

export type Asset = Selectable<AssetTable>;

export type NewAsset = Insertable<AssetTable>;

export type AssetUpdate = Updateable<AssetTable>;
