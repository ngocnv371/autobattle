import { Class } from "../../../app/models";
import { DoNothing } from "../actions/DoNothing";
import { UseSkill } from "../actions/UseSkill";
import { Heal } from "../skills/Heal";
import { Punch } from "../skills/Punch";

/**
 * prioritize healing allies before attacking
 */
export function Healer(): Class {
  return {
    getLevelUpRequirements(self) {
      return [{ name: "Magic Stone", quantity: 10 * self.level }];
    },
    processTurn(self, combatants, logger) {
      const dangered = combatants
        .filter(
          (c) =>
            c.life > 0 && c.faction === self.faction && c.life < c.maxLife / 2
        )
        .at(0);
      if (dangered) {
        return UseSkill(self, Heal.name, self.level, dangered);
      }
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
