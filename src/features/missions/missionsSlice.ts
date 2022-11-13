import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { createStorage } from "../../app/storage";
import { MissionSchema } from "../../data/schema";

export type missionsState = MissionSchema[];

export const loadMissions = createAsyncThunk(
  "missions/loadMissions",
  async () => {
    const storage = await createStorage();
    const list = await storage.get("missions");
    if (!list) {
      return require("../../data/seed/missions.json");
    }
    return list;
  }
);

export const saveMissions = createAsyncThunk(
  "missions/saveMissions",
  async (_, api) => {
    const storage = await createStorage();
    await storage.set("missions", api.getState());
  }
);

const initialState: missionsState = [];

export const missionsSlice = createSlice({
  name: "missions",
  initialState,
  reducers: {
    load: (state, action: PayloadAction<MissionSchema[]>) => {
      state.length = 0;
      state.push(...action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadMissions.fulfilled, (state, action) => {
      state.push(...action.payload);
    });
  },
});

export const { load } = missionsSlice.actions;

export default missionsSlice.reducer;
