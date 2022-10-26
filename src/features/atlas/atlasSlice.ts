import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Character } from "../battle/models";

export interface Dungeon {
  id: string;
  name: string;
  monsters: Character[];
}

export interface AtlasState {
  dungeons: Dungeon[];
}

const defaultDungeons: Dungeon[] = [
  {
    id: "w1",
    name: "Wolf's Den",
    monsters: [
      {
        id: "wolf1",
        name: "Wolf Alpha",
        int: 10,
        str: 15,
        dex: 10,
        faction: "monster",

        life: 0,
        maxLife: 100,

        skill: "Bite",
        loot: "monster",
      },
      {
        id: "wolf2",
        name: "Wolf Bitch",
        int: 10,
        str: 15,
        dex: 12,
        faction: "monster",

        life: 0,
        maxLife: 100,

        skill: "Bite",
        loot: "monster",
      },
      {
        id: "wolf3",
        name: "Wolf Pub",
        int: 10,
        str: 15,
        dex: 15,
        faction: "monster",

        life: 0,
        maxLife: 100,

        skill: "Bite",
        loot: "monster",
      },
    ],
  },
  {
    id: "w2",
    name: "Dim Hollow",
    monsters: [
      {
        id: "sp1",
        name: "Sprout",
        int: 10,
        str: 15,
        dex: 10,
        faction: "monster",

        life: 0,
        maxLife: 100,

        skill: "Slap",
        loot: "monster",
      },
      {
        id: "sp2",
        name: "Green Thorn",
        int: 10,
        str: 15,
        dex: 12,
        faction: "monster",

        life: 0,
        maxLife: 100,

        skill: "Slap",
        loot: "monster",
      },
      {
        id: "sp3",
        name: "Big Tree",
        int: 10,
        str: 15,
        dex: 15,
        faction: "monster",

        life: 0,
        maxLife: 100,

        skill: "Punch",
        loot: "monster",
      },
    ],
  },
  {
    id: "w3",
    name: "Dark Stream",
    monsters: [
      {
        id: "sd1",
        name: "Carp",
        int: 10,
        str: 15,
        dex: 10,
        faction: "monster",

        life: 0,
        maxLife: 100,

        skill: "Bite",
        loot: "monster",
      },
      {
        id: "sd2",
        name: "Snake",
        int: 10,
        str: 15,
        dex: 12,
        faction: "monster",

        life: 0,
        maxLife: 100,

        skill: "Bite",
        loot: "monster",
      },
      {
        id: "sd3",
        name: "Crocodile",
        int: 10,
        str: 15,
        dex: 15,
        faction: "monster",

        life: 0,
        maxLife: 100,

        skill: "Bite",
        loot: "monster",
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

export default atlasSlice.reducer;
