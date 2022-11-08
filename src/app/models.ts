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
  mana: number;
  maxMana: number;
  recovery: number;
  baseDamage: number;
}

export interface Combatant extends Character, CombatStats {
  faction: Faction;
  rested: number;
}

export interface Item {
  name: string;
  quantity: number;
}

export interface Logger {
  log(message?: any, ...optionalParams: any[]): void;
  error(message?: any, ...optionalParams: any[]): void;
}

export interface Action {
  execute(logger: Logger): void;
}

export interface Skill {
  use: (user: Combatant, target: Combatant, logger: Logger) => void;
}

export interface Class {
  getLevelUpRequirements(self: Character): Item[];
  processTurn(self: Combatant, combatants: Combatant[], logger: Logger): Action;
  createCombatant(self: Character): Combatant;
}
