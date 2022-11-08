import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character, Party } from "../../app/models";
import { RootState } from "../../app/store";
import classFactory from "../battle/class";

const heroes: Character[] = [
  {
    id: "skeleton1",
    level: 1,
    name: "Bob",
    class: "Healer",
  },
  {
    id: "p23",
    level: 1,
    name: "Weist",
    class: "Poisonborn",
  },
  {
    id: "player",
    level: 1,
    name: "Summoner",
    class: "Brute",
  },
  {
    id: "dis",
    level: 1,
    name: "Monkey",
    class: "Animal",
  },
];

const mainParty: Party = {
  id: "1",
  name: "Forward Force",
  members: heroes,
};

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
    addParty(state) {
      const lastId = state.parties
        .map((p) => p.id)
        .sort()
        .at(state.parties.length - 1);
      let newId = 2;
      if (Number(lastId)) {
        newId = Number(lastId) + 1;
      }
      state.parties.push({
        id: newId + "",
        name: "New Party",
        members: [],
      });
    },
    removeParty(state, action: PayloadAction<string>) {
      state.parties = state.parties.filter((p) => p.id !== action.payload);
    },
    addMember: (
      state,
      action: PayloadAction<{ partyId: string; member: Character }>
    ) => {
      const p = state.parties.find((p) => p.id === action.payload.partyId);
      if (!p) {
        throw new Error(`Party #${action.payload.partyId} not found`);
      }
      p.members.push(action.payload.member);
    },
    removeMember(
      state,
      action: PayloadAction<{ partyId: string; memberId: string }>
    ) {
      const p = state.parties.find((p) => p.id === action.payload.partyId);
      if (!p) {
        throw new Error(`Party #${action.payload.partyId} not found`);
      }
      p.members = p.members.filter((p) => p.id !== action.payload.memberId);
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
      member.level++;
    },
  },
});

export const { addParty, removeParty, addMember, removeMember, levelUp } =
  barrackSlice.actions;

export const selectParties = (state: RootState) => state.barrack.parties;
export const selectMember = (id: string) => (state: RootState) =>
  state.barrack.parties.flatMap((p) => p.members).find((m) => m.id === id);

export default barrackSlice.reducer;
