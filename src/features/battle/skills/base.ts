import { Combatant, Logger } from "../../../app/models";

export function applyDamageTo(
  combatant: Combatant,
  damage: number,
  logger: Logger
) {
  logger.log(`${combatant.name} takes ${damage} damage`);
  combatant.life -= damage;
  if (combatant.life < 0) {
    combatant.life = 0;
    logger.log(`${combatant.name} is dead`);
  }
}
