export interface Character {
  id: string;
  name: string;
  class: string;
  level: number;
}

export interface Dungeon {
  id: string;
  name: string;
  monsters: Character[];
}

export interface Party {
  id: string;
  name: string;
  members: Character[];
}

export type Faction = "player" | "monster";

export interface CombatStats {
  int: number;
  str: number;
  dex: number;
  maxLife: number;
  life: number;
  recovery: number;
  baseDamage: number;
}

export interface Combatant extends Character, CombatStats {
  faction: Faction;
  rested: number;
}
