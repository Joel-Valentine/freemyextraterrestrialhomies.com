export interface Alien {
  name: string;
  src: string;
  testimony: string;
  additionalTestimony?: string;
}

export interface UfoProperties {
  id: number;
  src: string;
  dx: number;
  dy: number;
  xFactor: (x: number, y: number) => number;
  yFactor: (x: number, y: number) => number;
  width: number;
  height: number;
  refreshRate: number; // higher is slower
  // health: number; // TODO: one health is one click. perhaps images change as health decreases
  // leftclicks: boolean; // TODO: some ufos could require right clicks rather than left clicks
  // rarity: number; // TODO: // how often a ufo spawns
  // score: number; // TODO: how many points a user gets for exploding a ufo. could add score for damage too
  // minimumScore: number; // TODO: the total score required for this type of ufo to spawn
  // soundEffect: string; // TODO: add sound effects for UFOs?
}

export interface IMsg {
  user: string;
  msg: string;
}

export interface UfoComponent {
  id: number;
}
