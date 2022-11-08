import { Class } from "../../../app/models";
import { DoNothing } from "../actions/DoNothing";
import { UseSkill } from "../actions/UseSkill";
import { SpitPoison } from "../skills/SpitPoison";

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
    createCombatant(self) {
      return {
        ...self,

        int: 10 + self.level * 1,
        str: 10 + self.level * 2,
        dex: 10 + self.level * 2,

        life: 100 + self.level * 20,
        maxLife: 100 + self.level * 20,
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
