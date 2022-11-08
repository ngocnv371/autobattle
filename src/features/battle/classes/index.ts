import { Animal } from "./Animal";
import { Brute } from "./Brute";
import { Class } from "../../../app/models";
import { Healer } from "./Healer";
import { Poisonborn } from "./Poisonborn";
import { Simpleton } from "./Simpleton";
import { Snake } from "./Snake";
import { Wolf } from "./Wolf";

const factories = [Brute, Healer, Animal, Wolf, Snake, Poisonborn];

export default function classFactory(name: string): Class {
  const c = factories.find((t) => t.name === name);
  if (c) {
    return c();
  }
  return Simpleton();
}
