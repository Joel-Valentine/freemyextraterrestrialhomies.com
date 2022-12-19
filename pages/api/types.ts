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
  refreshRate: number; // higher refreshRate results in a slower UFO
  health: number; // how many clicks a UFO takes to be destroyed
  // leftclicks: boolean; // TODO: some ufos could require right clicks rather than left clicks
  rarity: number; // higher rarity means a UFO is more likely to spawn
  score: number;
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
