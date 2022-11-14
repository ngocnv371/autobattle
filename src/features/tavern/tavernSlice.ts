import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { names, Config, uniqueNamesGenerator } from "unique-names-generator"
import { Character } from "../../app/models";
import { RootState } from "../../app/store";

const config: Config = {
  dictionaries: [names]
}

let lastWandererId = 1;
function generateWanderers(num: number): Character[] {
  return Array(num).fill(0).map(() => {
    const id = 'w' + ++lastWandererId
    // TODO: generate from available monsters
    return {
      id,
      name: uniqueNamesGenerator(config),
      class: "Human",
      level: 3,
    };
  });
}

export interface tavernState {
  wanderers: Character[];
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
