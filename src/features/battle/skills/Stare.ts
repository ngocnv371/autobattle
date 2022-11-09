import { Logger, Skill } from "../../../app/models";

export function Stare(level: number, logger: Logger): Skill {
  return {
    canUse(user, target) {
      return true;
    },
    use(user, target) {
      logger.log(`${user.name} stares at ${target.name}`);
    },
  };
}
