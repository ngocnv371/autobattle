import { Class, Combatant, Item } from "../app/models";
import { calculateProgressionValue } from "../app/utils";
import behaviorFactory from "../features/battle/behaviors";
import { MonsterSchema } from "./schema";


export function parseMonsters() {
  try {
    const monsters = require('./seed/monsters.json') as MonsterSchema[];
    return monsters;
  } catch (e) {
    console.error("failed to parse monsters", e);
    return [];
  }
}

const prefabs: MonsterSchema[] = parseMonsters();

export function monsterFactory(name: string, level: number): Class {
  const schema = prefabs.find((p) => p.name === name);

  function getLevelUpRequirements(): Item[] {
    if (!schema) {
      throw new Error(`monster not found ${name}`);
    }
    return Object.keys(schema.levelUp).map((k) => ({
      name: k,
      quantity: calculateProgressionValue(schema.levelUp[k], level),
    }));
  }
  function createCombatant(): Combatant {
    if (!schema) {
      throw new Error(`monster not found ${name}`);
    }
    const projected = {
      int: calculateProgressionValue(schema.int, level),
      str: calculateProgressionValue(schema.str, level),
      dex: calculateProgressionValue(schema.dex, level),

      maxLife: calculateProgressionValue(schema.maxLife, level),
      maxMana: calculateProgressionValue(schema.maxMana, level),

      recovery: calculateProgressionValue(schema.recovery, level),
      baseDamage: calculateProgressionValue(schema.baseDamage, level),
    };
    return {
      ...projected,
      id: "new",
      name: schema.name,
      faction: "monster",
      rested: 0,
      class: schema.name,
      level: level,
      life: projected.maxLife,
      mana: projected.maxMana,
    };
  }
  return {
    getLevelUpRequirements,
    createCombatant,
    processTurn(self, combatants, logger) {
      if (!schema) {
        throw new Error(`monster not found ${name}`);
      }
      const [behavior, primary, secondary] = schema.behavior;
      const b = behaviorFactory(behavior, primary, secondary);
      return b.processTurn(self, combatants, logger);
    },
  };
}

