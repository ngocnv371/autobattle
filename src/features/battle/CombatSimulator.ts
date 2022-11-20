import { Combatant, Faction, Logger } from "../../app/models";
import createLogger from "../../logger";
import behaviorFactory from "./behaviors";

export type Status = "pending" | "running" | "paused" | "ended";

export class CombatSimulator {
  private readonly combatants: Combatant[];
  private readonly logs: string[];
  private status: Status;
  private winner: Faction | null;

  constructor(combatants: Combatant[]) {
    this.combatants = combatants;
    this.logs = [];
    this.status = "pending";
    this.winner = null;
  }

  /**
   * start the simulation
   */
  public start() {
    this.status = "running";
  }

  /**
   * pause or resume the simulation
   */
  public togglePause() {
    this.status = this.status === "paused" ? "running" : "paused";
  }

  public getWinner() {
    return this.winner;
  }

  /**
   * Execute the simulation loop
   * @param delta milliseconds since last update
   */
  public update(delta: number) {
    if (this.status !== "running") {
      return;
    }

    if (this.isFactionDead("monster")) {
      this.winner = "player";
      this.status = "ended";
      return;
    }

    if (this.isFactionDead("player")) {
      this.winner = "monster";
      this.status = "ended";
      return;
    }

    const logger = this.createLogger();
    const livings = this.getLivingCombatants();
    livings.forEach((l) => this.processTurn(l, delta, logger));
  }

  /**
   * create a private logger that capture all `info` logs
   * @returns logger
   */
  private createLogger(): Logger {
    const now = new Date().getTime();
    const logger = createLogger(`combat-simulator-${now}`);
    const self = this;
    return {
      ...logger,
      info(message?, ...optionalParams) {
        self.logs.push(message);
        return logger.info(message, ...optionalParams);
      },
    };
  }

  /**
   * get all living combatants
   * @returns list of combatants
   */
  private getLivingCombatants() {
    return this.combatants.filter((c) => c.life > 0);
  }

  /**
   * check if all combatants of a faction are dead
   * @param faction faction to check
   * @returns boolean
   */
  private isFactionDead(faction: Faction) {
    return !this.combatants.some((c) => c.faction === faction && c.life > 0);
  }

  /**
   * process turn for a single combatant
   * @param c the combatant
   * @param delta elapsed time since last process
   * @param logger logger
   */
  private processTurn(c: Combatant, delta: number, logger: Logger) {
    if (c.life <= 0) {
      return;
    }
    c.rested += delta;
    if (c.rested > c.recovery) {
      logger.info(`${c.name} has recovered`);
    }
    const behavior = behaviorFactory(...c.behavior);
    const action = behavior.processTurn(c, this.combatants, logger);
    action.execute(logger);
    c.rested = 0;
  }
}

export default CombatSimulator;
