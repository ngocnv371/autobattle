import { Item } from "../inventory/inventorySlice";

function monster(): Item[] {
  return [{ name: "Bone", quantity: 3 }];
}

function human(): Item[] {
  return [
    { name: "Human Skin", quantity: 1 },
    { name: "Human Flesh", quantity: 1 },
    { name: "Human Eye", quantity: 2 },
  ];
}

const lootTable = [monster, human];

export function generateLoot(loot: string) {
  const table = lootTable.find((t) => t.name === loot);
  if (table) {
    return table();
  }
  return monster();
}
