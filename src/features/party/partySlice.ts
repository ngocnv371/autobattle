import { Character } from "../../app/models";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { createStorage } from "../../app/storage";

const MAX_MEMBER = 4;

export interface partyState {
  members: Character[];
}

export const loadParty = createAsyncThunk("party/loadParty", async (_, api) => {
  console.debug("load party");
  const storage = await createStorage();
  const state = await storage.get("party");
  if (!state) {
    console.warn("no saved party data");
    return api.rejectWithValue(null);
  }
  return state;
});

export const saveParty = createAsyncThunk<void, void, { state: RootState }>(
  "party/saveParty",
  async (_, api) => {
    console.debug("save party");
    const storage = await createStorage();
    await storage.set("party", api.getState().party);
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(
      loadParty.fulfilled,
      (state, action: PayloadAction<partyState>) => {
        state.members.length = 0;
        state.members.push(...action.payload.members);
      }
    );
  },
});

export const { addMember, removeMember, levelUp } = partySlice.actions;

export const selectMemberById = (id: string) => (state: RootState) =>
  state.party.members.find((m) => m.id === id);

export const selectMembers = (state: RootState) => state.party.members;

export const selectCanAddMember = (state: RootState) =>
  state.party.members.length < MAX_MEMBER;

export default partySlice.reducer;
