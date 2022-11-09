import { Class } from "../../../app/models";
import { DoNothing } from "../actions/DoNothing";

export function Simpleton(): Class {
  return {
    getLevelUpRequirements(self) {
      return [{ name: "Meat", quantity: 10 * self.level }];
    },
    processTurn(self, combatants, logger) {
      return DoNothing(self);
    },
    createCombatant(self) {
      return {
        ...self,

        int: 10 + self.level * 1,
        str: 10 + self.level * 2,
        dex: 10 + self.level * 2,

        life: 300 + self.level * 30,
        maxLife: 300 + self.level * 30,
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
