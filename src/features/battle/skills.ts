import { Logger } from "../../logger";
import { Combatant } from "./models";

export interface Skill {
  use: (user: Combatant, target: Combatant, logger: Logger) => void;
}

function applyDamageTo(combatant: Combatant, damage: number, logger: Logger) {
  logger.log(`${combatant.name} takes ${damage} damage`);
  combatant.life -= damage;
  if (combatant.life < 0) {
    combatant.life = 0;
    logger.log(`${combatant.name} is dead`);
  }
}

export function Punch(level: number, logger: Logger): Skill {
  return {
    use(user, target) {
      logger.log(`${user.name} punches ${target.name}`);
      applyDamageTo(target, user.baseDamage * level * user.str, logger);
    },
  };
}

export function Slap(level: number, logger: Logger): Skill {
  return {
    use(user, target) {
      logger.log(`${user.name} slaps ${target.name}`);
      applyDamageTo(target, user.baseDamage * level * user.dex, logger);
    },
  };
}

export function Bite(level: number, logger: Logger): Skill {
  return {
    use(user, target) {
      logger.log(`${user.name} slaps ${target.name}`);
      applyDamageTo(target, user.baseDamage * level * user.str, logger);
    },
  };
}

export function Heal(level: number, logger: Logger): Skill {
  return {
    use(user, target) {
      logger.log(`${user.name} heals ${target.name}`);
      applyDamageTo(target, -user.baseDamage * level * user.int, logger);
    },
  };
}

const factories = [Punch, Slap, Bite, Heal];

export default function skillFactory(name: string, level: number, logger: Logger): Skill {
  const f = factories.find((i) => i.name === name);
  if (!f) {
    throw new Error(`Skill [${name}] not found`);
  }
  return f(level, logger);
}
