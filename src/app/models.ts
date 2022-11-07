export interface Character {
  id: string;
  name: string;
  class: string;
  level: number;
}

export interface Dungeon {
  id: string;
  name: string;
  monsters: Character[];
}

export interface Party {
  id: string;
  name: string;
  members: Character[];
}
