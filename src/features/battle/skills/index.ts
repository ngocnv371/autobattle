import { Logger, Skill } from "../../../app/models";
import { Bite } from "./Bite";
import { DrainLife } from "./DrainLife";
import { Heal } from "./Heal";
import { Punch } from "./Punch";
import { Scream } from "./Scream";
import { Slap } from "./Slap";
import { SpitPoison } from "./SpitPoison";
import { Stare } from "./Stare";

const factories = [Punch, Slap, Bite, Heal, SpitPoison, Stare, Scream, DrainLife];

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
