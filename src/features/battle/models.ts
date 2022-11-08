import { Character } from "../../app/models";

export type Faction = "player" | "monster";

export interface Combatant extends Character {
  maxLife: number;

  int: number;
  str: number;
  dex: number;
  faction: Faction;
  rested: number;
  recovery: number;
  baseDamage: number;
  life: number;
}
