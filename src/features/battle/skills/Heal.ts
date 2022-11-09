import { Logger, Skill } from "../../../app/models";
import { applyDamageTo } from "./base";

export function Heal(level: number, logger: Logger): Skill {
  const cost = 30 + level * 7;
  return {
    canUse(user, target) {
      return user.mana >= cost;
    },
    use(user, target) {
      logger.log(`${user.name} heals ${target.name}`);
      applyDamageTo(target, -user.baseDamage * level * user.int, logger);
      user.mana -= cost;
    },
  };
}
