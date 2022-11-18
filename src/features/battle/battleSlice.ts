import { CharacterInfo, Combatant, Faction } from "../../app/models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Logger } from "../../app/models";
import { RootState } from "../../app/store";
import createLogger from "../../logger";
import { monsterFactory } from "../../data/monsters";

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
  logs: string[];
}

const initialState: BattleState = {
  status: "none",
  combatants: [],
  timer: "",
  logs: [],
};

export const battleSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {
    start: (
      state,
      action: PayloadAction<{
        players: CharacterInfo[];
        monsters: CharacterInfo[];
      }>
    ) => {
      let lastId = 1;
      state.status = "running";
      state.logs = [];
      const players: Combatant[] = action.payload.players.map((p) => {
        const c: Combatant = {
          ...p,
          faction: "player",
          rested: 0,
          id: ++lastId + "",
        };
        return c;
      });
      const monsters: Combatant[] = action.payload.monsters.map((p) => {
        const c: Combatant = {
          ...p,
          faction: "monster",
          rested: 0,
          id: ++lastId + "",
        };
        return c;
      });
      state.combatants = [...players, ...monsters];
    },
    update: (state, action: PayloadAction<number>) => {
      const now = new Date().getTime();
      const logger = createLogger(`update-${now}`);
      const battleLogger: Logger = {
        log(message?, ...optionalParams) {
          state.logs.push(message);
          return logger.log(message, ...optionalParams);
        },
        info: logger.info,
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
        if (c.life <= 0) {
          return;
        }

        if (c.rested > c.recovery) {
          battleLogger.info(
            `${c.name} has recovered and decided to do something`
          );
          c.rested = 0;
          const mc = monsterFactory(c.class, c.level);
          const action = mc.processTurn(c, state.combatants, battleLogger);
          action.execute(battleLogger);
        }
      }

      const delta = action.payload;
      if (state.status !== "running") {
        return;
      }
      if (isFactionDead("monster")) {
        battleLogger.log("player wins");
        state.status = "playerWin";
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

export const selectLogs = (state: RootState) => state.battle.logs;

export const selectCombatants = (faction: Faction) => (state: RootState) =>
  state.battle.combatants.filter((c) => c.faction === faction);

export default battleSlice.reducer;
