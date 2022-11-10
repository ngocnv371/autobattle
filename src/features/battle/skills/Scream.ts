import { Logger, Skill } from "../../../app/models";

export function Scream(level: number, logger: Logger): Skill {
  return {
    canUse(user, target) {
      return true;
    },
    use(user, target) {
      logger.log(`${user.name} screams at ${target.name}`);
    },
  };
}
