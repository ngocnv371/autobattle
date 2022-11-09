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
