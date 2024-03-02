import type { ColumnType } from "kysely";

export type Assettype =
  | "assignment"
  | "character"
  | "item"
  | "resource"
  | "skill";

export type Droptype = "character" | "item" | "resource" | "skill";

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;

export type Rarity =
  | "ancient"
  | "common"
  | "epic"
  | "legendary"
  | "rare"
  | "uncommon";

export type Startingtype = "character" | "item" | "resource";

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Usertype = "admin" | "player";

export interface Account {
  address: string;
}

export interface Asset {
  id: Generated<string>;
  type: Assettype;
  name: string;
  url: string;
}

export interface Assignment {
  id: Generated<string>;
  name: string;
  worldId: string;
  assetId: string;
}

export interface Auth {
  address: string;
  code: number;
  refreshToken: string | null;
  accessToken: string | null;
}

export interface Character {
  id: Generated<string>;
  name: string;
  assetId: string;
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
  id: Generated<string>;
  type: Droptype;
  dropChance: number;
  minAmount: number;
  maxAmount: number;
  assignmentId: string;
  resourceId: string | null;
  skillId: string | null;
  itemId: string | null;
  characterId: string | null;
}

export interface Item {
  id: Generated<string>;
  name: string;
  rarity: Rarity;
  worldId: string;
  assetId: string;
}

export interface LootHistory {
  id: Generated<string>;
  timestamp: Generated<Timestamp>;
  dropTableId: string;
  turnHistoryId: string;
  playerCharacterId: string;
  amount: number;
}

export interface PlayerCharacter {
  id: Generated<string>;
  characterId: string;
  userId: string;
}

export interface PlayerItem {
  id: Generated<string>;
  itemId: string;
  userId: string;
}

export interface PlayerResource {
  id: Generated<string>;
  resourceId: string;
  userId: string;
  amount: Generated<number>;
}

export interface Resource {
  id: Generated<string>;
  name: string;
  rarity: Rarity;
  worldId: string;
  assetId: string;
}

export interface Skill {
  id: Generated<string>;
  name: string;
  worldId: string;
  assetId: string;
}

export interface StarterKit {
  id: Generated<string>;
  worldId: string;
  type: Startingtype;
  amount: number | null;
  resourceId: string | null;
  itemId: string | null;
  characterId: string | null;
}

export interface TurnHistory {
  id: Generated<string>;
  timestamp: Generated<Timestamp>;
  userId: string;
}

export interface User {
  id: Generated<string>;
  address: string;
  worldId: string;
  turns: Generated<number>;
  type: Generated<Usertype>;
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
