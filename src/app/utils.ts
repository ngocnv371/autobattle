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
