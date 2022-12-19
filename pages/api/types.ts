export interface Alien {
  name: string;
  src: string;
  testimony: string;
  additionalTestimony?: string;
}

export interface UfoProperties {
  id: number;
  name: string;
  src: string;
  dx: number;
  dy: number;
  width: number;
  height: number;
  refreshRate: number; // higher is slower
  health: number;
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
