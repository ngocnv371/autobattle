import { Curve, Progression } from "../data/schema";

/**
 * bezier path with 4 control points
 * P = (1−t)^3 P1 + 3(1−t)^2 tP2 +3(1−t)t^2 P3 + t^3 P4
 * @param t [0-1]
 * @param a first point
 * @param b second point
 * @param c third point
 * @param d fourth point
 * @returns result value
 */
export function cubicBezier(
  t: number,
  a: number,
  b: number,
  c: number,
  d: number
) {
  return (
    (1 - t) * (1 - t) * (1 - t) * a +
    3 * (1 - t) * (1 - t) * t * b +
    3 * (1 - t) * t * t * c +
    t * t * t * d
  );
}

const MAX_LEVEL = 100;

function curveToPoints(curve: Curve): number[] {
  const sampleCurves: { [name: string]: number[] } = {
    linear: [0, 0, 1, 1],
    "ease-out": [0, 0, 0.58, 1],
    "ease-in-out": [0.42, 0, 0.58, 1],
    "ease-in": [0.42, 0, 1, 1],
  };
  let points = sampleCurves["linear"];
  if (typeof curve === "string") {
    if (Object.keys(sampleCurves).includes(curve)) {
      points = sampleCurves[curve];
    } else {
      console.warn(`unknown curve ${curve}`);
    }
  } else {
    points = curve;
  }
  return points;
}

export function calculateProgressionValue(
  progression: Progression,
  level: number
): number {
  const [curve, min, max] = progression;
  const points = curveToPoints(curve);
  const position = cubicBezier(
    level / MAX_LEVEL,
    points[0],
    points[1],
    points[2],
    points[3]
  );
  return Math.floor(min + position * max);
}

export function randomRange(min: number, max: number) {
  return Math.floor(min + Math.random() * max);
}
