import { Logger, Skill } from "../../../app/models";
import { Bite } from "./Bite";
import { Heal } from "./Heal";
import { Punch } from "./Punch";
import { Slap } from "./Slap";
import { SpitPoison } from "./SpitPoison";

const factories = [Punch, Slap, Bite, Heal, SpitPoison];

export default function skillFactory(
  name: string,
  level: number,
  logger: Logger
): Skill {
  const f = factories.find((i) => i.name === name);
  if (!f) {
    throw new Error(`Skill [${name}] not found`);
  }
  return f(level, logger);
}
