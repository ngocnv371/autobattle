import { Item } from "../inventory/inventorySlice";

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function monster(): Item[] {
  return [{ name: "Bone", quantity: random(0, 3) }];
}

function human(): Item[] {
  return [
    { name: "Human Skin", quantity: random(0, 1) },
    { name: "Human Flesh", quantity: random(0, 2) },
    { name: "Human Eye", quantity: random(0, 2) },
    ...monster()
  ];
}

const lootTable = [monster, human];

export function lootFactory(loot: string) {
  const table = lootTable.find((t) => t.name === loot);
  const bag = [];
  if (table) {
    bag.push(...table());
  } else {
    bag.push(...monster());
  }
  return bag.filter((b) => b.quantity);
}
