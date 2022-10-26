export type Faction = "player" | "monster";

export interface Character {
  id: string;
  name: string;
  life: number;
  maxLife: number;

  int: number;
  str: number;
  dex: number;
  faction: Faction;

  skill: string;
}

export interface Combatant extends Character {
  rested: number;
  recovery: number;
  baseDamage: number;
}
