import { CharacterSchema } from "../data/schema";

export interface Character extends CharacterSchema {
  id: string;
}

export interface Dungeon {
  id: string;
  name: string;
  monsters: Character[];
}

export type Faction = "player" | "monster";

export interface CombatStats {
  int: number;
  str: number;
  dex: number;
  maxLife: number;
  life: number;
  mana: number;
  maxMana: number;
  recovery: number;
  baseDamage: number;
}

export interface CharacterInfo extends Character, CombatStats {
  image: string;
}

export interface Combatant extends CharacterInfo {
  faction: Faction;
  rested: number;
}

export interface Item {
  name: string;
  quantity: number;
}

export interface Logger {
  log(message?: any, ...optionalParams: any[]): void;
  info(message?: any, ...optionalParams: any[]): void;
  error(message?: any, ...optionalParams: any[]): void;
}

export interface Action {
  execute(logger: Logger): void;
}

export interface Skill {
  canUse: (user: Combatant, target: Combatant, logger: Logger) => boolean;
  use: (user: Combatant, target: Combatant, logger: Logger) => void;
}

export interface Class {
  processTurn(self: Combatant, combatants: Combatant[], logger: Logger): Action;
}

export interface CombatBehavior {
  processTurn(self: Combatant, combatants: Combatant[], logger: Logger): Action;
}
