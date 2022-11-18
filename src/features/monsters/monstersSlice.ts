import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CharacterInfo, CombatStats } from "../../app/models";
import { createStorage } from "../../app/storage";
import { RootState } from "../../app/store";
import { calculateProgressionValue, randomRange } from "../../app/utils";
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

export const selectMonsterByName = (name: string) => (state: RootState) => {
  const monster = state.monsters.find((m) => m.name === name);
  if (!monster) {
    console.warn(`monster not found ${name}`);
    return null;
  }
  return monster;
};

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

export const selectLootByLevel =
  (name: string, level: number) => (state: RootState) => {
    const monster = selectMonsterByName(name)(state);
    if (!monster) {
      return [];
    }
    const loot = Object.keys(monster.loot)
      .map((k) => {
        const max = calculateProgressionValue(monster.loot[k], level);
        console.log(`${name} LV ${level} can drops up to ${max}x ${k}`);
        return {
          name: k,
          quantity: randomRange(monster.loot[k][1], max),
        };
      })
      .filter((l) => l.quantity > 0);
    console.log(
      `${name} LV ${level} drops ${loot
        .map((l) => `${l.quantity}x ${l.name}`)
        .join(", ")}`
    );
    return loot;
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

export const selectCharacterInfoByLevel =
  (name: string, level: number) =>
  (state: RootState): CharacterInfo | null => {
    const monster = selectMonsterByName(name)(state);
    if (!monster) {
      return null;
    }
    const stats = selectStatsByLevel(name, level)(state)!;
    const info: CharacterInfo = {
      ...stats,
      level,
      class: name,
      image: monster.image,
      name,
      id: "",
    };
    return info;
  };

export default monstersSlice.reducer;
