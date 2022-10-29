import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Wanderer {
  id: string;
  name: string;
  level: number;
  class: string;
}

let lastWandererId = 1;
function generateWanderers(num: number): Wanderer[] {
  return Array(num).fill(0).map(() => {
    const id = 'w' + ++lastWandererId
    return {
      id,
      name: "Nobody",
      class: "Wolf",
      level: 3,
    };
  });
}

export interface tavernState {
  wanderers: Wanderer[];
}

const initialState: tavernState = {
  wanderers: generateWanderers(4),
};

export const tavernSlice = createSlice({
  name: "tavern",
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<string>) => {
      state.wanderers = state.wanderers.filter((w) => w.id !== action.payload);
    },
    refresh: (state) => {
      state.wanderers = generateWanderers(5);
    },
  },
});

export const { remove, refresh } = tavernSlice.actions;

export const selectWanderers = (state: RootState) => state.tavern.wanderers;

export default tavernSlice.reducer;
