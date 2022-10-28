import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import classFactory from "../battle/class";
import { Character } from "../battle/models";

const heroes: Character[] = [
  {
    id: "skeleton1",
    level: 1,
    name: "Bob",
    int: 15,
    str: 10,
    dex: 16,
    faction: "player",

    life: 0,
    maxLife: 300,

    class: "Healer",
  },
  {
    id: "p23",
    level: 1,
    name: "Weist",
    int: 10,
    str: 15,
    dex: 16,
    faction: "player",

    life: 0,
    maxLife: 300,

    class: "Poisonborn",
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
    maxLife: 300,

    class: "Brute",
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
    maxLife: 300,

    class: "Animal",
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
    levelUp: (state, action: PayloadAction<string>) => {
      const member = state.parties
        .flatMap((p) => p.members)
        .find((m) => m.id === action.payload);
      if (!member) {
        console.error(`member not found ${action.payload}`);
        return;
      }
      const mc = classFactory(member.class);
      mc.levelUp(member);
      member.level++
    },
  },
});

export const { add, levelUp } = barrackSlice.actions;

export const selectParties = (state: RootState) => state.barrack.parties;
export const selectMember = (id: string) => (state: RootState) =>
  state.barrack.parties.flatMap((p) => p.members).find((m) => m.id === id);

export default barrackSlice.reducer;
