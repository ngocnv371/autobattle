import { CombatBehavior } from "../../../app/models";
import { Aggressive } from "./Aggressive";
import { Passive } from "./Passive";

const factories = [Aggressive, Passive];

export default function behaviorFactory(
  name: string,
  primary: string,
  secondary: string
): CombatBehavior {
  const c = factories.find((t) => t.name === name);
  if (c) {
    return c(primary, secondary);
  }
  return Passive();
}
