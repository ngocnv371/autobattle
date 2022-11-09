import { Class } from "../../../app/models";
import { DoNothing } from "../actions/DoNothing";
import { UseSkill } from "../actions/UseSkill";
import skillFactory from "../skills";
import { Punch } from "../skills/Punch";

/**
 * simply punch everything
 */
export function Brute(): Class {
  return {
    getLevelUpRequirements(self) {
      return [{ name: "Meat", quantity: 10 * self.level }];
    },
    processTurn(self, combatants, logger) {
      const weakest = combatants
        .filter((c) => c.faction !== self.faction && c.life > 0)
        .sort((a, b) => a.life - b.life)
        .at(0);
      if (!weakest) {
        return DoNothing(self);
      }
      const skill = skillFactory(Punch.name, self.level, logger);
      if (!skill.canUse(self, weakest, logger)) {
        return DoNothing(self);
      }
      return UseSkill(self, Punch.name, self.level, weakest);
    },
    createCombatant(self) {
      return {
        ...self,

        int: 10 + self.level * 1,
        str: 10 + self.level * 2,
        dex: 10 + self.level * 2,

        life: 200 + self.level * 30,
        maxLife: 200 + self.level * 30,
        mana: 50 + self.level * 10,
        maxMana: 50 + self.level * 10,

        baseDamage: 10 + self.level * 2,
        recovery: 1000 + self.level * 10,
        faction: "monster",
        rested: 0,
      };
    },
  };
}
