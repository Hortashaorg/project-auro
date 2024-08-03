// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import type { ColumnType, Selectable, Insertable, Updateable } from 'kysely';

/** Identifier type for public.server */
export type ServerId = string & { __brand: 'ServerId' };

/** Represents the table public.server */
export default interface ServerTable {
  id: ColumnType<ServerId, ServerId | undefined, ServerId>;

  name: ColumnType<string, string, string>;

  online: ColumnType<boolean, boolean | undefined, boolean>;

  updatedAt: ColumnType<Date, Date | string | undefined, Date | string>;

  createdAt: ColumnType<Date, Date | string | undefined, Date | string>;
}

export type Server = Selectable<ServerTable>;

export type NewServer = Insertable<ServerTable>;

export type ServerUpdate = Updateable<ServerTable>;
