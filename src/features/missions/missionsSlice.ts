import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CharacterInfo, Item } from "../../app/models";
import { createStorage } from "../../app/storage";
import { RootState } from "../../app/store";
import { MissionLog, MissionSchema } from "../../data/schema";
import { mergeItems } from "../inventory/utils";
import {
  selectCharacterInfoByLevel,
  selectLootByLevel,
} from "../monsters/monstersSlice";
import { selectPartyLevel } from "../party/partySlice";

export type missionsState = {
  items: MissionSchema[];
  logs: MissionLog[];
};

export const loadMissions = createAsyncThunk(
  "missions/loadMissions",
  async (): Promise<missionsState> => {
    console.debug("load missions");
    const storage = await createStorage();
    const data = await storage.get("missions");
    if (!data) {
      console.warn("no saved missions data, load factory setting");
      const seed = require("../../data/seed/missions.json");
      return {
        items: seed,
        logs: [],
      };
    }
    return data;
  }
);

export const saveMissions = createAsyncThunk<void, void, { state: RootState }>(
  "missions/saveMissions",
  async (_, api) => {
    console.debug("save missions");
    const storage = await createStorage();
    await storage.set("missions", api.getState().missions);
  }
);

export const generateLoot = createAsyncThunk<
  Item[],
  string,
  { state: RootState }
>("missions/generateLoot", async (missionId, api) => {
  return selectMissionLootById(missionId)(api.getState());
});

const initialState: missionsState = {
  items: [],
  logs: [],
};

export const missionsSlice = createSlice({
  name: "missions",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<MissionSchema>) => {
      state.items.push(action.payload);
    },
    complete: (state, action: PayloadAction<string>) => {
      const m = state.items.find((i) => i.id === action.payload);
      if (!m) {
        console.warn(`mission not found ${action.payload}`);
        return;
      }
      const l = state.logs.find((i) => i.id === action.payload);
      if (!l) {
        state.logs.push({
          id: action.payload,
          times: 1,
        });
      } else {
        l.times += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loadMissions.fulfilled,
      (state, action: PayloadAction<missionsState>) => {
        state.items = action.payload.items;
        state.logs = action.payload.logs;
      }
    );
  },
});

export const { add, complete } = missionsSlice.actions;

export const selectMissions = (state: RootState) => {
  const level = selectPartyLevel(state);
  const availableMissions = state.missions.items
    .filter((m) => m.level <= level)
    .filter((m) => {
      if (!m.repeat) {
        return true;
      }
      const log = state.missions.logs.find((l) => l.id === m.id);
      if (!log) {
        return true;
      }
      return log.times < m.repeat;
    });
  return availableMissions;
};

export const selectMissionById = (id: string) => (state: RootState) => {
  const mission = state.missions.items.find((d) => d.id === id);
  if (!mission) {
    console.warn(`mission not found ${id}`);
    return null;
  }
  return mission;
};

export const selectMissionLootById = (id: string) => (state: RootState) => {
  const m = selectMissionById(id)(state);
  if (!m) {
    return [];
  }
  const loot = m.enemies
    .map((e) => selectLootByLevel(e.class, e.level)(state))
    .reduce((a, b) => mergeItems(a, b), []);
  return loot;
};

export const selectCharactersByMissionId =
  (id: string) => (state: RootState) => {
    const m = selectMissionById(id)(state);
    if (!m) {
      return [];
    }
    const chars = m.enemies.map((e) => {
      const monster = selectCharacterInfoByLevel(e.class, e.level)(state);
      if (!monster) {
        return null;
      }
      return monster;
    });
    return chars.filter(Boolean) as CharacterInfo[];
  };

export default missionsSlice.reducer;
