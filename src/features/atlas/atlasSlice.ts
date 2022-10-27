import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Character } from "../battle/models";

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
        int: 10,
        str: 15,
        dex: 10,
        faction: "monster",

        life: 0,
        maxLife: 300,

        class: "Wolf",
      },
      {
        id: "wolf2",
        level: 1,
        name: "Scarred Wolf",
        int: 10,
        str: 15,
        dex: 15,
        faction: "monster",

        life: 0,
        maxLife: 300,

        class: "Wolf",
      },
      {
        id: "wolf3",
        level: 1,
        name: "Wolf Pub",
        int: 10,
        str: 15,
        dex: 15,
        faction: "monster",

        life: 0,
        maxLife: 300,

        class: "Wolf",
      },
      {
        id: "wolf4",
        level: 1,
        name: "Wolfborn",
        int: 10,
        str: 15,
        dex: 15,
        faction: "monster",

        life: 0,
        maxLife: 300,

        class: "Brute",
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
        int: 10,
        str: 15,
        dex: 10,
        faction: "monster",

        life: 0,
        maxLife: 300,

        class: "Brute",
      },
      {
        id: "sp2",
        level: 1,
        name: "Green Thorn",
        int: 10,
        str: 15,
        dex: 12,
        faction: "monster",

        life: 0,
        maxLife: 300,

        class: "Brute",
      },
      {
        id: "sp3",
        level: 1,
        name: "Big Tree",
        int: 10,
        str: 15,
        dex: 15,
        faction: "monster",

        life: 0,
        maxLife: 300,

        class: "Brute",
      },
      {
        id: "sp4",
        level: 1,
        name: "Gardener",
        int: 10,
        str: 15,
        dex: 15,
        faction: "monster",

        life: 0,
        maxLife: 300,

        class: "Healer",
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
        int: 10,
        str: 15,
        dex: 10,
        faction: "monster",

        life: 0,
        maxLife: 300,

        class: "Brute",
      },
      {
        id: "sd2",
        level: 1,
        name: "Snake",
        int: 10,
        str: 15,
        dex: 12,
        faction: "monster",

        life: 0,
        maxLife: 300,

        class: "Snake",
      },
      {
        id: "sd3",
        level: 1,
        name: "Crocodile",
        int: 10,
        str: 15,
        dex: 15,
        faction: "monster",

        life: 0,
        maxLife: 300,

        class: "Animal",
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
        int: 10,
        str: 15,
        dex: 17,
        faction: "monster",

        life: 0,
        maxLife: 300,

        class: "Snake",
      },
      {
        id: "sd2",
        level: 1,
        name: "White Snake",
        int: 10,
        str: 15,
        dex: 19,
        faction: "monster",

        life: 0,
        maxLife: 300,

        class: "Snake",
      },
      {
        id: "sd3",
        level: 1,
        name: "Python",
        int: 10,
        str: 15,
        dex: 20,
        faction: "monster",

        life: 0,
        maxLife: 300,

        class: "Snake",
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
