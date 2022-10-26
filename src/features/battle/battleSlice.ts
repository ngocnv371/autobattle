import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Item } from "../inventory/inventorySlice";
import { mergeItems } from "../inventory/utils";
import { generateLoot } from "./loot";
import { Character, Combatant, Faction } from "./models";
import skillFactory from "./skills";

/**
 * A combatant with `dex` of `10` will attack once every second.
 * With `dex` of `20`, it will attack twice every second.
 * This meaning attack timer (attack on elapsed) = 10/dex * 1000
 */
const BASE_ATTACK_RECOVER = 1000;

export type BattleStatus = "none" | "running" | "paused" | "ended";
export interface BattleState {
  status: BattleStatus;
  combatants: Combatant[];
  timer: TimerHandler;
  loot: Item[];
}

const initialState: BattleState = {
  status: "none",
  combatants: [],
  timer: "",
  loot: [],
};

export const battleSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {
    start: (state, action: PayloadAction<Character[]>) => {
      state.status = "running";
      state.combatants = action.payload.map((c) => {
        return {
          ...c,
          rested: 0,
          recovery: Math.floor((10 / c.dex) * BASE_ATTACK_RECOVER),
          baseDamage: 15,
          life: c.maxLife,
        };
      });
    },
    update: (state, action: PayloadAction<number>) => {
      function getWeakestCombatant(faction: Faction) {
        return state.combatants
          .filter((c) => c.life > 0 && c.faction === faction)
          .sort((a, b) => a.life - b.life)
          .at(0);
      }
      function getEnemyFaction(faction: Faction): Faction {
        return faction === "monster" ? "player" : "monster";
      }
      function isFactionDead(faction: Faction) {
        return (
          state.combatants.filter((c) => c.faction === faction && c.life > 0)
            .length === 0
        );
      }
      function isOver() {
        return isFactionDead("player") || isFactionDead("monster");
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
          console.log(`${c.name} has recovered and decided to do something`);
          c.rested = 0;
          const target = getWeakestCombatant(getEnemyFaction(c.faction));
          if (target) {
            const skill = skillFactory(c.skill, 1);
            skill.use(c, target);
            if (target.life <= 0) {
              const loot = generateLoot(target.loot);
              state.loot = mergeItems(state.loot, loot);
            }
          } else {
            console.log(`${c.name} found no target`);
            state.status = "ended";
            return;
          }
        } else {
          console.log(`${c.name} is resting`);
        }
      }

      const delta = action.payload;
      if (state.status !== "running") {
        return;
      }
      if (isOver()) {
        console.log("game over");
        state.status = "ended";
        return;
      }
      const livings = getLivingCombatants();
      livings.forEach(processTurn);
    },
    stop: (state) => {
      state.status = "ended";
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
  state.battle.status === "ended";

export const selectStatus = (state: RootState) => state.battle.status;

export const selectLoot = (state: RootState) => state.battle.loot;

export const selectPlayers = (state: RootState) =>
  state.battle.combatants.filter((c) => c.faction === "player");

export const selectMonsters = (state: RootState) =>
  state.battle.combatants.filter((c) => c.faction === "monster");

export default battleSlice.reducer;
