import { Class } from "../app/models";
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

  return {
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

