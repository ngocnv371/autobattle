import { Logger, Skill } from "../../../app/models";
import { applyDamageTo } from "./base";

export function Heal(level: number, logger: Logger): Skill {
  return {
    use(user, target) {
      logger.log(`${user.name} heals ${target.name}`);
      applyDamageTo(target, -user.baseDamage * level * user.int, logger);
    },
  };
}
