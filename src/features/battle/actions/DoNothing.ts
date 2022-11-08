import { Action, Combatant } from "../../../app/models";

export function DoNothing(self: Combatant): Action {
  return {
    execute(logger) {
      logger.log(`${self.name} does nothing`);
    },
  };
}
