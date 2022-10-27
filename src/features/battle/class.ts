import { Logger } from "../../logger";
import { Combatant } from "./models";
import skillFactory from "./skills";

export interface Action {
  execute(logger: Logger): void;
}

export interface Class {
  processTurn(self: Combatant, combatants: Combatant[], logger: Logger): Action;
}

function doNothing(self: Combatant): Action {
  return {
    execute(logger) {
      logger.log(`${self.name} does nothing`);
    },
  }
};

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
    processTurn(self, combatants, logger) {
      const dangered = combatants.filter(c => c.life > 0 && c.faction === self.faction && c.life < c.maxLife / 2).at(0)
      if (dangered) {
        return executeSkill(self, "Heal", self.level, dangered)
      }
      const weakest = combatants
        .filter((c) => c.faction !== self.faction && c.life > 0)
        .sort((a, b) => a.life - b.life)
        .at(0);
      if (!weakest) {
        return doNothing(self);
      }
      return executeSkill(self, "Punch", self.level, weakest);
    },
  };
}

/**
 * simply punch anything
 */
function Brute(): Class {
  return {
    processTurn(self, combatants, logger) {
      const weakest = combatants
        .filter((c) => c.faction !== self.faction && c.life > 0)
        .sort((a, b) => a.life - b.life)
        .at(0);
      if (!weakest) {
        return doNothing(self);
      }
      return executeSkill(self, "Punch", self.level, weakest);
    },
  };
}

const table = [Brute, Healer];

export default function classFactory(name: string): Class {
  const c = table.find((t) => t.name === name);
  if (c) {
    return c();
  }
  return Simpleton();
}
