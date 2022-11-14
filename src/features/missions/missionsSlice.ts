import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { createStorage } from "../../app/storage";
import { RootState } from "../../app/store";
import { MissionSchema } from "../../data/schema";

export type missionsState = MissionSchema[];

export const loadMissions = createAsyncThunk(
  "missions/loadMissions",
  async () => {
    console.debug("load missions");
    const storage = await createStorage();
    const list = await storage.get("missions");
    if (!list) {
      console.warn("no saved missions data, load factory setting");
      return require("../../data/seed/missions.json");
    }
    return list;
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

const initialState: missionsState = [];

export const missionsSlice = createSlice({
  name: "missions",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<MissionSchema>) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadMissions.fulfilled, (state, action) => {
      state.push(...action.payload);
    });
  },
});

export const { add } = missionsSlice.actions;

export const selectEnemies = (missionId: string) => (state: RootState) =>
  state.missions.find((d) => d.id === missionId)?.enemies || [];

export default missionsSlice.reducer;
