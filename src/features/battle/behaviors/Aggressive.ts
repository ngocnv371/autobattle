import { CombatBehavior } from "../../../app/models";
import { DoNothing } from "../actions/DoNothing";
import { UseSkill } from "../actions/UseSkill";
import skillFactory from "../skills";

export function Aggressive(primary: string, secondary: string): CombatBehavior {
  return {
    processTurn(self, combatants, logger) {
      const weakest = combatants
        .filter((c) => c.faction !== self.faction && c.life > 0)
        .sort((a, b) => a.life - b.life)
        .at(0);
      if (!weakest) {
        return DoNothing(self);
      }
      const skill = skillFactory(primary, self.level, logger);
      if (!skill.canUse(self, weakest, logger)) {
        return UseSkill(self, secondary, self.level, weakest);
      }
      return UseSkill(self, primary, self.level, weakest);
    },
  };
}
