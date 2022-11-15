import { Item } from "../app/models";

export type CubicBezierCurve = [p0: number, p1: number, p2: number, p3: number];
export type BasicCurve = "linear" | "ease-out" | "ease-in-out" | "ease-in";
export type Curve = BasicCurve | CubicBezierCurve;

export type Progression = [curve: Curve, min: number, max: number];
export type ProgressionDictionary = {
  [item: string]: Progression;
};

type Behavior = [type: string, primary: string, secondary: string];

export interface MonsterSchema {
  name: string;
  image: string;
  int: Progression;
  str: Progression;
  dex: Progression;

  maxLife: Progression;
  maxMana: Progression;

  recovery: Progression;
  baseDamage: Progression;

  behavior: Behavior;

  levelUp: ProgressionDictionary;
  loot: ProgressionDictionary;
}

export interface CharacterSchema {
  name: string;
  level: number;
  class: string;
}

export interface MissionSchema {
  id: string;
  level: number;
  name: string;
  description: string;
  enemies: CharacterSchema[];
}

export interface ShopItemSchema extends Item {
  price: number;
}
