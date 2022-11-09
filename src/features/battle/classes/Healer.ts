import { Class } from "../../../app/models";
import { DoNothing } from "../actions/DoNothing";
import { UseSkill } from "../actions/UseSkill";
import skillFactory from "../skills";
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

        life: 200 + self.level * 20,
        maxLife: 200 + self.level * 20,
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
