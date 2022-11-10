import { CombatBehavior } from "../../../app/models";
import { Aggressive } from "./Aggressive";

export function Passive(): CombatBehavior {
  return Aggressive("Stare", "Stare");
}
