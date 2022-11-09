import { Logger, Skill } from "../../../app/models";
import { applyDamageTo } from "./base";

export function Punch(level: number, logger: Logger): Skill {
  return {
    canUse(user, target) {
      return true;
    },
    use(user, target) {
      logger.log(`${user.name} punches ${target.name}`);
      applyDamageTo(target, user.baseDamage + level, logger);
    },
  };
}
