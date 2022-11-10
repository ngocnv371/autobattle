import { Logger, Skill } from "../../../app/models";
import { applyDamageTo } from "./base";

export function DrainLife(level: number, logger: Logger): Skill {
  const cost = level * 2;
  return {
    canUse(user, target) {
      return user.mana >= cost;
    },
    use(user, target) {
      logger.log(`${user.name} drain life from ${target.name}`);
      const dmg = user.baseDamage + level;
      applyDamageTo(target, dmg, logger);
      user.mana -= cost;
      if (user.mana < 0) {
        user.mana = 0;
      }
      user.life += dmg;
      if (user.life > user.maxLife) {
        user.life = user.maxLife;
      }
    },
  };
}
