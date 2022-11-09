import { Class, Combatant, Item } from "../app/models";
import { cubicBezier } from "../app/utils";
import behaviorFactory from "../features/battle/behaviors";
import { Curve, MonsterSchema, Progression } from "./schema";

const MAX_LEVEL = 100;

function curveToPoints(curve: Curve): number[] {
  const sampleCurves: { [name: string]: number[] } = {
    linear: [0, 0, 1, 1],
    "ease-out": [0, 0, 0.58, 1],
    "ease-in-out": [0.42, 0, 0.58, 1],
    "ease-in": [0.42, 0, 1, 1],
  };
  let points = sampleCurves["linear"];
  if (typeof curve === "string") {
    if (Object.keys(sampleCurves).includes(curve)) {
      points = sampleCurves[curve];
    } else {
      console.warn(`unknown curve ${curve}`);
    }
  } else {
    points = curve;
  }
  return points;
}

function calculateValue(progression: Progression, level: number): number {
  const [curve, min, max] = progression;
  const points = curveToPoints(curve);
  const position = cubicBezier(
    level / MAX_LEVEL,
    points[0],
    points[1],
    points[2],
    points[3]
  );
  return min + position * max;
}

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
      quantity: calculateValue(schema.levelUp[k], level),
    }));
  }
  function createCombatant(): Combatant {
    if (!schema) {
      throw new Error(`monster not found ${name}`);
    }
    const projected = {
      int: calculateValue(schema.int, level),
      str: calculateValue(schema.str, level),
      dex: calculateValue(schema.dex, level),

      maxLife: calculateValue(schema.maxLife, level),
      maxMana: calculateValue(schema.maxMana, level),

      recovery: calculateValue(schema.recovery, level),
      baseDamage: calculateValue(schema.baseDamage, level),
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
