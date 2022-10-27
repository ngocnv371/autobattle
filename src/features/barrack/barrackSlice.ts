import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Character } from "../battle/models";

const heroes: Character[] = [
  {
    id: "skeleton1",
    level: 1,
    name: "Bob",
    int: 10,
    str: 15,
    dex: 16,
    faction: "player",

    life: 0,
    maxLife: 100,

    class: "Brute",
    loot: "monster",
  },
  {
    id: "skeleton2",
    level: 1,
    name: "Weist",
    int: 10,
    str: 15,
    dex: 16,
    faction: "player",

    life: 0,
    maxLife: 100,

    class: "Brute",
    loot: "monster",
  },
  {
    id: "player",
    level: 1,
    name: "Summoner",
    int: 20,
    str: 10,
    dex: 22,
    faction: "player",

    life: 0,
    maxLife: 100,

    class: "Brute",
    loot: "human",
  },
  {
    id: "dis",
    level: 1,
    name: "Monkey",
    int: 20,
    str: 10,
    dex: 12,
    faction: "player",

    life: 0,
    maxLife: 100,

    class: "Brute",
    loot: "monster",
  },
];

const mainParty: Party = {
  id: "heroes",
  name: "Forward Force",
  members: heroes,
};

export interface Party {
  id: string;
  name: string;
  members: Character[];
}

export interface barrackState {
  parties: Party[];
}

const initialState: barrackState = {
  parties: [mainParty],
};

export const barrackSlice = createSlice({
  name: "barrack",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Character[]>) => {
      //
    },
  },
});

export const { add } = barrackSlice.actions;

export const selectParties = (state: RootState) => state.barrack.parties;

export default barrackSlice.reducer;
