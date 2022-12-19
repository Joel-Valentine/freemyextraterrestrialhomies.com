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
  rarity: number; // higher rarity means a UFO is more likely to spawn
  score: number;
  minimumScore: number; // the total score required for this type of UFO to spawn
}

export interface ExtendedUfoProperties extends UfoProperties {
  xFactor: (y: number) => number;
  yFactor: (x: number) => number;
}

export interface IMsg {
  user: string;
  msg: string;
}

export interface UfoComponent {
  id: number;
}
