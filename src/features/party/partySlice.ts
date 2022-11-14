import { Character } from "../../app/models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const MAX_MEMBER = 4;

export interface partyState {
  members: Character[];
}

const initialState: partyState = {
  members: [],
};

export const partySlice = createSlice({
  name: "party",
  initialState,
  reducers: {
    addMember: (state, action: PayloadAction<Character>) => {
      if (state.members.length < MAX_MEMBER) {
        state.members.push(action.payload);
      }
    },
    removeMember(state, action: PayloadAction<string>) {
      state.members = state.members.filter((m) => m.id !== action.payload);
    },
    levelUp: (state, action: PayloadAction<string>) => {
      const member = state.members.find((m) => m.id === action.payload);
      if (!member) {
        console.error(`member not found ${action.payload}`);
        return;
      }
      member.level++;
    },
  },
});

export const { addMember, removeMember, levelUp } = partySlice.actions;

export const selectOneMember = (id: string) => (state: RootState) =>
  state.party.members.find((m) => m.id === id);

export const selectMembers = (state: RootState) => state.party.members;

export const selectCanAddMember = (state: RootState) =>
  state.party.members.length < MAX_MEMBER;

export default partySlice.reducer;
