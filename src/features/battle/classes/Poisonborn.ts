import { Class } from "../../../app/models";
import { DoNothing } from "../actions/DoNothing";
import { SpitPoison } from "../skills";
import { UseSkill } from "../actions/UseSkill";

/**
 * simply bite everything
 */
export function Poisonborn(): Class {
  return {
    getLevelUpRequirements(self) {
      return [{ name: "Poison", quantity: 9 * self.level }];
    },
    processTurn(self, combatants, logger) {
      const weakest = combatants
        .filter((c) => c.faction !== self.faction && c.life > 0)
        .sort((a, b) => a.life - b.life)
        .at(0);
      if (!weakest) {
        return DoNothing(self);
      }
      return UseSkill(self, SpitPoison.name, self.level, weakest);
    },
  };
}
