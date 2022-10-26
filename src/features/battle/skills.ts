import { Combatant } from "./models";

export interface Skill {
  name: string;
  use: (user: Combatant, target: Combatant) => void;
}

function applyDamageTo(combatant: Combatant, damage: number) {
  console.log(`${combatant.name} takes ${damage} damage`);
  combatant.life -= damage;
  if (combatant.life < 0) {
    combatant.life = 0;
    console.log(`${combatant.name} is dead`);
  }
}

function Punch(level: number): Skill {
  return {
    name: "Punch",
    use(user, target) {
      console.log(`${user.name} punches ${target.name}`);
      applyDamageTo(target, user.baseDamage * level);
    },
  };
}

function Slap(level: number): Skill {
  return {
    name: "Slap",
    use(user, target) {
      console.log(`${user.name} slaps ${target.name}`);
      applyDamageTo(target, user.baseDamage * level);
    },
  };
}

function Bite(level: number): Skill {
  return {
    name: "Bite",
    use(user, target) {
      console.log(`${user.name} slaps ${target.name}`);
      applyDamageTo(target, user.baseDamage * level);
    },
  };
}

const factories = [Punch, Slap, Bite];

export default function skillFactory(name: string, level: number): Skill {
  const f = factories.find((i) => i.name === name);
  if (!f) {
    throw new Error(`Skill [${name}] not found`);
  }
  return f(level);
}
