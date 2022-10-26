import { Item } from "./inventorySlice";

export function mergeItems(a: Item[], b: Item[]): Item[] {
  const result = a;
  b.forEach((i) => {
    const x = a.find((k) => k.name === i.name);
    if (x) {
      x.quantity += i.quantity;
    } else {
      a.push(i);
    }
  });
  return result;
}
