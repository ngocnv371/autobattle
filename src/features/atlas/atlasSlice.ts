import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "../../app/models";
import { RootState } from "../../app/store";

export interface Dungeon {
  id: string;
  name: string;
  description?: string;
  monsters: Character[];
}

export interface AtlasState {
  dungeons: Dungeon[];
}

const defaultDungeons: Dungeon[] = [
  {
    id: "w1",
    name: "Wolf's Den",
    description:
      "The drought brought hunger. The wolves are getting bolder everyday. Somebody got to do something.",
    monsters: [
      {
        id: "wolf1",
        level: 1,
        name: "Wolf Alpha",
        class: "Grey Wolf",
      },
      {
        id: "wolf2",
        level: 1,
        name: "Scarred Wolf",
        class: "Grey Wolf",
      },
      {
        id: "wolf3",
        level: 1,
        name: "Wolf Pub",
        class: "Grey Wolf",
      },
      {
        id: "wolf4",
        level: 1,
        name: "Wolfborn",
        class: "Grey Wolf",
      },
    ],
  },
  {
    id: "w2",
    name: "Dim Hollow",
    description:
      "Wanderers near the valley sometimes didn't come back. Some tried to find out but they too disappeared.",
    monsters: [
      {
        id: "sp1",
        level: 1,
        name: "Sprout",
        class: "Ever Grass",
      },
      {
        id: "sp2",
        level: 1,
        name: "Green Thorn",
        class: "Ever Grass",
      },
      {
        id: "sp3",
        level: 1,
        name: "Big Tree",
        class: "Ever Grass",
      },
      {
        id: "sp4",
        level: 1,
        name: "Gardener",
        class: "Ever Grass",
      },
    ],
  },
  {
    id: "w3",
    name: "Dark Stream",
    description:
      "Fishing boats no longer come by that corner. Nobody talks about it.",
    monsters: [
      {
        id: "sd1",
        level: 1,
        name: "Fisherman",
        class: "Blue Carp",
      },
      {
        id: "sd2",
        level: 1,
        name: "Snake",
        class: "Blue Carp",
      },
      {
        id: "sd3",
        level: 1,
        name: "Crocodile",
        class: "Grass Snake",
      },
    ],
  },
  {
    id: "w4",
    name: "Green Hills",
    description: "The tranquil landscape is quite convincing.",
    monsters: [
      {
        id: "sd1",
        level: 1,
        name: "Rattlesnake",
        class: "Grass Snake",
      },
      {
        id: "sd2",
        level: 1,
        name: "White Snake",
        class: "Grass Snake",
      },
      {
        id: "sd3",
        level: 1,
        name: "Python",
        class: "Grass Snake",
      },
    ],
  },
];

const initialState: AtlasState = {
  dungeons: defaultDungeons,
};

export const atlasSlice = createSlice({
  name: "atlas",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Dungeon>) => {},
  },
});

export const { add } = atlasSlice.actions;

export const selectDungeons = (state: RootState) => state.atlas.dungeons;

export const selectMonsters = (dungeonId: string) => (state: RootState) =>
  state.atlas.dungeons.find((d) => d.id === dungeonId)?.monsters || [];

export default atlasSlice.reducer;
