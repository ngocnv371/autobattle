import { Logger, Skill } from "../../../app/models";
import { applyDamageTo } from "./base";

export function Slap(level: number, logger: Logger): Skill {
  return {
    use(user, target) {
      logger.log(`${user.name} slaps ${target.name}`);
      applyDamageTo(target, user.baseDamage * level * user.dex, logger);
    },
  };
}
