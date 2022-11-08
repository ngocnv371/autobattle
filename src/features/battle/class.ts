import { Character, Combatant } from "../../app/models";
import skillFactory, { Bite, Heal, Punch, SpitPoison } from "./skills";

import { Item } from "../inventory/inventorySlice";
import { Logger } from "../../logger";

export interface Action {
  execute(logger: Logger): void;
}

export interface Class {
  getLevelUpRequirements(self: Character): Item[];
  levelUp(self: Character): void;
  processTurn(self: Combatant, combatants: Combatant[], logger: Logger): Action;
}

function doNothing(self: Combatant): Action {
  return {
    execute(logger) {
      logger.log(`${self.name} does nothing`);
    },
  };
}

function executeSkill(
  self: Combatant,
  name: string,
  level: number,
  target: Combatant
): Action {
  return {
    execute(logger) {
      const skill = skillFactory(name, level, logger);
      skill.use(self, target, logger);
    },
  };
}

function Simpleton(): Class {
  return {
    getLevelUpRequirements(self) {
      return [{ name: "Meat", quantity: 10 * self.level }];
    },
    levelUp(self) {
    },
    processTurn(self, combatants, logger) {
      return doNothing(self);
    },
  };
}

/**
 * prioritize healing allies before attacking
 */
function Healer(): Class {
  return {
    getLevelUpRequirements(self) {
      return [{ name: "Magic Stone", quantity: 10 * self.level }];
    },
    levelUp(self) {
    },
    processTurn(self, combatants, logger) {
      const dangered = combatants
        .filter(
          (c) =>
            c.life > 0 && c.faction === self.faction && c.life < c.maxLife / 2
        )
        .at(0);
      if (dangered) {
        return executeSkill(self, Heal.name, self.level, dangered);
      }
      const weakest = combatants
        .filter((c) => c.faction !== self.faction && c.life > 0)
        .sort((a, b) => a.life - b.life)
        .at(0);
      if (!weakest) {
        return doNothing(self);
      }
      return executeSkill(self, Punch.name, self.level, weakest);
    },
  };
}

/**
 * simply punch everything
 */
function Brute(): Class {
  return {
    getLevelUpRequirements(self) {
      return [{ name: "Meat", quantity: 10 * self.level }];
    },
    levelUp(self) {
    },
    processTurn(self, combatants, logger) {
      const weakest = combatants
        .filter((c) => c.faction !== self.faction && c.life > 0)
        .sort((a, b) => a.life - b.life)
        .at(0);
      if (!weakest) {
        return doNothing(self);
      }
      return executeSkill(self, Punch.name, self.level, weakest);
    },
  };
}

/**
 * simply bite everything
 */
function Animal(): Class {
  return {
    getLevelUpRequirements(self) {
      return [
        { name: "Meat", quantity: 5 * self.level },
        { name: "Bone", quantity: 1 * self.level },
      ];
    },
    levelUp(self) {
    },
    processTurn(self, combatants, logger) {
      const weakest = combatants
        .filter((c) => c.faction !== self.faction && c.life > 0)
        .sort((a, b) => a.life - b.life)
        .at(0);
      if (!weakest) {
        return doNothing(self);
      }
      return executeSkill(self, Bite.name, self.level, weakest);
    },
  };
}

/**
 * simply bite everything
 */
function Snake(): Class {
  return {
    getLevelUpRequirements(self) {
      return [{ name: "Meat", quantity: 5 * self.level }];
    },
    levelUp(self) {
    },
    processTurn(self, combatants, logger) {
      const weakest = combatants
        .filter((c) => c.faction !== self.faction && c.life > 0)
        .sort((a, b) => a.life - b.life)
        .at(0);
      if (!weakest) {
        return doNothing(self);
      }
      return executeSkill(self, Bite.name, self.level, weakest);
    },
  };
}

/**
 * simply bite everything
 */
function Wolf(): Class {
  return {
    getLevelUpRequirements(self) {
      return [
        { name: "Meat", quantity: 5 * self.level },
        { name: "Bone", quantity: 1 * self.level },
      ];
    },
    levelUp(self) {
    },
    processTurn(self, combatants, logger) {
      const weakest = combatants
        .filter((c) => c.faction !== self.faction && c.life > 0)
        .sort((a, b) => a.life - b.life)
        .at(0);
      if (!weakest) {
        return doNothing(self);
      }
      return executeSkill(self, Bite.name, self.level, weakest);
    },
  };
}

/**
 * simply bite everything
 */
 function Poisonborn(): Class {
  return {
    getLevelUpRequirements(self) {
      return [
        { name: "Poison", quantity: 9 * self.level },
      ];
    },
    levelUp(self) {
    },
    processTurn(self, combatants, logger) {
      const weakest = combatants
        .filter((c) => c.faction !== self.faction && c.life > 0)
        .sort((a, b) => a.life - b.life)
        .at(0);
      if (!weakest) {
        return doNothing(self);
      }
      return executeSkill(self, SpitPoison.name, self.level, weakest);
    },
  };
}

const table = [Brute, Healer, Animal, Wolf, Snake, Poisonborn];

export default function classFactory(name: string): Class {
  const c = table.find((t) => t.name === name);
  if (c) {
    return c();
  }
  return Simpleton();
}
