import type { ColumnType } from "kysely";

export type Assettype = "assignment" | "character" | "item" | "resource" | "skill";

export type Droptype = "character" | "item" | "resource" | "skill";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Rarity = "ancient" | "common" | "epic" | "legendary" | "rare" | "uncommon";

export type Startingtype = "character" | "item" | "resource";

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Usertype = "admin" | "player";

export interface Account {
  address: string;
}

export interface Asset {
  id: Generated<string>;
  name: string;
  type: Assettype;
  url: string;
}

export interface Assignment {
  assetId: string;
  id: Generated<string>;
  name: string;
  worldId: string;
}

export interface Auth {
  accessToken: string | null;
  address: string;
  code: number;
  refreshToken: string | null;
}

export interface Character {
  assetId: string;
  id: Generated<string>;
  name: string;
  rarity: Rarity;
  worldId: string;
}

export interface CharacterAssignment {
  assignmentId: string;
  characterId: string;
}

export interface CharacterSkill {
  playerCharacterId: string;
  skillId: string;
  xp: Generated<number>;
}

export interface DropTable {
  assignmentId: string;
  characterId: string | null;
  dropChance: number;
  id: Generated<string>;
  itemId: string | null;
  maxAmount: number;
  minAmount: number;
  resourceId: string | null;
  skillId: string | null;
  type: Droptype;
}

export interface Item {
  assetId: string;
  id: Generated<string>;
  name: string;
  rarity: Rarity;
  worldId: string;
}

export interface LootHistory {
  amount: number;
  dropTableId: string;
  id: Generated<string>;
  playerCharacterId: string;
  timestamp: Generated<Timestamp>;
  turnHistoryId: string;
}

export interface PlayerCharacter {
  characterId: string;
  id: Generated<string>;
  userId: string;
}

export interface PlayerItem {
  id: Generated<string>;
  itemId: string;
  userId: string;
}

export interface PlayerResource {
  amount: Generated<number>;
  id: Generated<string>;
  resourceId: string;
  userId: string;
}

export interface Resource {
  assetId: string;
  id: Generated<string>;
  name: string;
  rarity: Rarity;
  worldId: string;
}

export interface Skill {
  assetId: string;
  id: Generated<string>;
  name: string;
  worldId: string;
}

export interface StarterKit {
  amount: number | null;
  characterId: string | null;
  id: Generated<string>;
  itemId: string | null;
  resourceId: string | null;
  type: Startingtype;
  worldId: string;
}

export interface TurnHistory {
  id: Generated<string>;
  timestamp: Generated<Timestamp>;
  userId: string;
}

export interface User {
  address: string;
  id: Generated<string>;
  turns: Generated<number>;
  type: Generated<Usertype>;
  worldId: string;
}

export interface World {
  id: Generated<string>;
  name: string;
  online: Generated<boolean>;
}

export interface DB {
  account: Account;
  asset: Asset;
  assignment: Assignment;
  auth: Auth;
  character: Character;
  characterAssignment: CharacterAssignment;
  characterSkill: CharacterSkill;
  dropTable: DropTable;
  item: Item;
  lootHistory: LootHistory;
  playerCharacter: PlayerCharacter;
  playerItem: PlayerItem;
  playerResource: PlayerResource;
  resource: Resource;
  skill: Skill;
  starterKit: StarterKit;
  turnHistory: TurnHistory;
  user: User;
  world: World;
}
