import { Item } from "../inventory/inventorySlice";

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Monster(): Item[] {
  return [{ name: "Bone", quantity: random(0, 3) }];
}

function Human(): Item[] {
  return [
    { name: "Human Skin", quantity: random(0, 1) },
    { name: "Human Flesh", quantity: random(0, 2) },
    { name: "Human Eye", quantity: random(0, 2) },
    ...Monster(),
  ];
}

function Wolf(): Item[] {
  return [
    { name: "Wolf Pelt", quantity: random(0, 1) },
    { name: "Wolf Meat", quantity: random(0, 2) },
    { name: "Wolf Teeth", quantity: random(0, 8) },
    ...Monster(),
  ];
}

function Snake(): Item[] {
  return [
    { name: "Snake Skin", quantity: random(0, 1) },
    { name: "Snake Spine", quantity: random(0, 1) },
    { name: "Poison", quantity: 1 },
    ...Monster(),
  ];
}

const lootTable = [Monster, Human, Wolf, Snake];

export function lootFactory(loot: string) {
  const table = lootTable.find((t) => t.name === loot);
  const bag = [];
  if (table) {
    bag.push(...table());
  } else {
    bag.push(...Monster());
  }
  return bag.filter((b) => b.quantity);
}
