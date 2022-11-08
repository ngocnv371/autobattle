import { Action, Combatant } from "../../../app/models";

import skillFactory from "../skills";

export function UseSkill(
  self: Combatant,
  name: string,
  level: number,
  target: Combatant
): Action {
  return {
    execute(logger) {
      const skill = skillFactory(name, level, logger);
      skill.use(self, target, logger);
    },
  };
}
