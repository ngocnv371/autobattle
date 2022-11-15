import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CombatStats } from "../../app/models";

import { createStorage } from "../../app/storage";
import { RootState } from "../../app/store";
import { calculateProgressionValue } from "../../app/utils";
import { MonsterSchema } from "../../data/schema";

export type monstersState = MonsterSchema[];

export const loadMonsters = createAsyncThunk(
  "monsters/loadMonsters",
  async () => {
    const storage = await createStorage();
    const list = await storage.get("monsters");
    if (!list) {
      console.warn("no saved monsters data, load factory setting");
      return require("../../data/seed/monsters.json");
    }
    return list;
  }
);

export const saveMonsters = createAsyncThunk<void, void, { state: RootState }>(
  "monsters/saveMonsters",
  async (_, api) => {
    console.debug("save monsters");
    const storage = await createStorage();
    await storage.set("monsters", api.getState().monsters);
  }
);

const initialState: monstersState = [];

export const monstersSlice = createSlice({
  name: "monsters",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<MonsterSchema>) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadMonsters.fulfilled, (state, action) => {
      state.length = 0;
      state.push(...action.payload);
    });
  },
});

export const { add } = monstersSlice.actions;

export const selectMonsterByName = (name: string) => (state: RootState) =>
  state.monsters.find((m) => m.name === name);

export const selectLevelUpRequirements =
  (name: string, level: number) => (state: RootState) => {
    const monster = selectMonsterByName(name)(state);
    if (!monster) {
      return [];
    }
    return Object.keys(monster.levelUp).map((k) => ({
      name: k,
      quantity: calculateProgressionValue(monster.levelUp[k], level),
    }));
  };

export const selectStatsByLevel =
  (name: string, level: number) =>
  (state: RootState): CombatStats | null => {
    const monster = selectMonsterByName(name)(state);
    if (!monster) {
      return null;
    }
    const stats: CombatStats = {
      int: calculateProgressionValue(monster.int, level),
      str: calculateProgressionValue(monster.str, level),
      dex: calculateProgressionValue(monster.dex, level),

      maxLife: calculateProgressionValue(monster.maxLife, level),
      life: 0,
      maxMana: calculateProgressionValue(monster.maxMana, level),
      mana: 0,

      recovery: calculateProgressionValue(monster.recovery, level),
      baseDamage: calculateProgressionValue(monster.baseDamage, level),
    };
    stats.life = stats.maxLife;
    stats.mana = stats.maxMana;
    return stats;
  };

 export default monstersSlice.reducer;
