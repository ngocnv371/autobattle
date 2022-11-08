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
  };
}
