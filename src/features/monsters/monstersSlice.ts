import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { createStorage } from "../../app/storage";
import { RootState } from "../../app/store";
import { MonsterSchema } from "../../data/schema";

export type monstersState = MonsterSchema[];

export const loadMonsters = createAsyncThunk("monsters/loadMonsters", async () => {
  const storage = await createStorage();
  const list = await storage.get("monsters");
  if (!list) {
    return require("../../data/seed/monsters.json");
  }
  return list;
});

export const saveMonsters = createAsyncThunk<void, void, { state: RootState }>(
  "missions/saveMonsters",
  async (_, api) => {
    const storage = await createStorage();
    await storage.set("monsters", api.getState().monsters);
  }
);

const initialState: monstersState = [];

export const monstersSlice = createSlice({
  name: "monsters",
  initialState,
  reducers: {
    load: (state, action: PayloadAction<MonsterSchema[]>) => {
      state.length = 0;
      state.push(...action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadMonsters.fulfilled, (state, action) => {
      state.push(...action.payload);
    });
  },
});

export const { load } = monstersSlice.actions;

export default monstersSlice.reducer;
