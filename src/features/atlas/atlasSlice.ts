import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import missions from "../../data/missions";
import { MissionSchema } from "../../data/schema";

export interface AtlasState {
  missions: MissionSchema[];
}

const initialState: AtlasState = {
  missions: missions,
};

export const atlasSlice = createSlice({
  name: "atlas",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {},
  },
});

export const { add } = atlasSlice.actions;

export const selectMissions = (state: RootState) => state.atlas.missions;

export const selectEnemies = (missionId: string) => (state: RootState) =>
  state.atlas.missions.find((d) => d.id === missionId)?.enemies || [];

export default atlasSlice.reducer;
