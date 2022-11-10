import { Logger, Skill } from "../../../app/models";
import { applyDamageTo } from "./base";

export function SpitPoison(level: number, logger: Logger): Skill {
  const cost = 20 + level * 5;
  return {
    canUse(user, target) {
      return user.mana >= cost;
    },
    use(user, target) {
      logger.log(`${user.name} spit poison at ${target.name}`);
      applyDamageTo(target, user.baseDamage * level * user.str, logger);
      user.mana -= cost;
      if (user.mana < 0) {
        user.mana = 0;
      }
    },
  };
}
