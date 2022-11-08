import { Class } from "../../../app/models";
import { DoNothing } from "../actions/DoNothing";
import { Punch } from "../skills";
import { UseSkill } from "../actions/UseSkill";

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
      return UseSkill(self, Punch.name, self.level, weakest);
    },
  };
}
