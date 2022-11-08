import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "../../app/models";
import { RootState } from "../../app/store";
import createLogger, { Logger } from "../../logger";
import { Item } from "../inventory/inventorySlice";
import { mergeItems } from "../inventory/utils";
import classFactory from "./class";
import { lootFactory } from "./loot";
import { Combatant, Faction } from "./models";

/**
 * A combatant with `dex` of `10` will attack once every second.
 * With `dex` of `20`, it will attack twice every second.
 * This meaning attack timer (attack on elapsed) = 10/dex * 1000
 */
const BASE_ATTACK_RECOVER = 1000;

export type BattleStatus =
  | "none"
  | "running"
  | "paused"
  | "playerWin"
  | "playerLoose";
export interface BattleState {
  status: BattleStatus;
  combatants: Combatant[];
  timer: TimerHandler;
  loot: Item[];
  logs: string[];
}

const initialState: BattleState = {
  status: "none",
  combatants: [],
  timer: "",
  loot: [],
  logs: [],
};

export const battleSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {
    start: (
      state,
      action: PayloadAction<{ players: Character[]; monsters: Character[] }>
    ) => {
      function instantiateCharacter(
        char: Character,
        faction: Faction
      ): Combatant {
        return {
          ...char,
          rested: 0,
          recovery: Math.floor((10 / 20) * BASE_ATTACK_RECOVER),
          baseDamage: 15,
          life: 200,
          int: 10,
          dex: 20,
          str: 10,
          maxLife: 200,
          faction,
        };
      }
      state.status = "running";
      state.loot = [];
      state.logs = [];
      state.combatants = [
        ...action.payload.players.map((p) => instantiateCharacter(p, "player")),
        ...action.payload.monsters.map((p) =>
          instantiateCharacter(p, "monster")
        ),
      ];
    },
    update: (state, action: PayloadAction<number>) => {
      const now = new Date().getTime();
      const logger = createLogger(`update-${now}`);
      const battleLogger: Logger = {
        log(message?, ...optionalParams) {
          state.logs.push(message);
          return logger.log(message, ...optionalParams);
        },
        error: logger.error,
      };
      function isFactionDead(faction: Faction) {
        return (
          state.combatants.filter((c) => c.faction === faction && c.life > 0)
            .length === 0
        );
      }
      function getLivingCombatants() {
        return state.combatants.filter((c) => c.life > 0);
      }
      function processTurn(c: Combatant) {
        // update cool down
        c.rested += delta;
        if (c.life < 0) {
          return;
        }

        if (c.rested > c.recovery) {
          battleLogger.log(
            `${c.name} has recovered and decided to do something`
          );
          c.rested = 0;
          const mc = classFactory(c.class);
          const action = mc.processTurn(c, state.combatants, battleLogger);
          action.execute(battleLogger);
        }
      }
      function generateLoot() {
        let bag: Item[] = [];
        state.combatants
          .filter((c) => c.faction === "monster")
          .forEach((m) => {
            bag = mergeItems(bag, lootFactory(m.class));
          });
        state.loot = bag;
      }

      const delta = action.payload;
      if (state.status !== "running") {
        return;
      }
      if (isFactionDead("monster")) {
        battleLogger.log("player wins");
        state.status = "playerWin";
        generateLoot();
        return;
      } else if (isFactionDead("player")) {
        battleLogger.log("player loose");
        state.status = "playerLoose";
        return;
      }
      const livings = getLivingCombatants();
      livings.forEach(processTurn);
    },
    stop: (state) => {
      state.status = "playerLoose";
    },
    togglePause: (state) => {
      if (state.status === "paused") {
        state.status = "running";
      } else {
        state.status = "paused";
      }
    },
  },
});

export const { start, update, stop, togglePause } = battleSlice.actions;

export const selectIsOver = (state: RootState) =>
  state.battle.status === "playerLoose" || state.battle.status === "playerWin";

export const selectStatus = (state: RootState) => state.battle.status;

export const selectLoot = (state: RootState) => state.battle.loot;
export const selectLogs = (state: RootState) => state.battle.logs;

export const selectPlayers = (state: RootState) =>
  state.battle.combatants.filter((c) => c.faction === "player");

export const selectMonsters = (state: RootState) =>
  state.battle.combatants.filter((c) => c.faction === "monster");

export default battleSlice.reducer;
