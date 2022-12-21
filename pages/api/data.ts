import { Alien, UfoProperties } from "./types";

export const aliensmeta: Alien[] = [
  {
    name: "Zorgath",
    testimony:
      "I ain't no threat to nobody, boss. I'm just a peaceful alien tryna coexist with y'all.",
    src: "/alien-mugshots/alien-2.png",
  },
  {
    name: "Vy'keen",
    testimony:
      "I didn't do nothing wrong, I was just flexing my skills and they hatin' on me.",
    src: "/alien-mugshots/extraterrestrial-alien-mug-shot-4.png",
  },
  {
    name: "Ullian 00-11Z",
    testimony:
      "They locked me up for no reason, I'm just a baller trying to get paid.",
    src: "/alien-mugshots/extraterrestrial-alien-mug-shot-2.png",
  },
  {
    name: "Thorgon",
    testimony:
      "I'm innocent, I swear it on my momma's grave. They got the wrong Arcturian, I was just living my life.",
    src: "/alien-mugshots/extraterrestrial-alien-mug-shot-3.png",
  },
  {
    name: "Xenthor-Omega",
    testimony:
      "You got the wrong Zeta, homes. I ain't done nothin' to nobody, I swear on my mothership.",
    src: "/alien-mugshots/extraterrestrial alien mug shots with a UFO in area 51 (1).png",
  },
  {
    name: "Žşąğğą",
    testimony:
      "I done wasted more humans than I can count, and I ain't never gonna stop. They ain't never gonna learn their lesson",
    src: "/alien-mugshots/Mugshots of extra terrestrial aliens taken when being booked into Area 51 with star wars style alien features.png",
  },
  {
    name: "Wrygon",
    testimony:
      "Yo, I ain't done nothin' wrong, dawg. I was just passin' through, tryna find my way back home.",
    src: "/alien-mugshots/extraterrestrial-alien-mug-shot-5.png",
  },
  {
    name: "Barry",
    testimony:
      "I was on holiday in Ibiza with me bird Stacey, and we ended up getting abducted by the Area 51 crews!",
    additionalTestimony:
      "My name is Barry, and I'm not an alien, I swear on me mum's Sunday roast! I used to be a regular Brexit geezer from Essex, who loved watching North FC and going to the pub with me mates. But one summer, I was on holiday in Ibiza with me bird Stacey, and we ended up getting abducted by the Area 51 crews! I don't know how it happened, but somehow they mistook us for aliens and booked us into their secret facility. I promise you, I'm human just like you, and I just want to go home and watch North FC with me mates!",
    src: "/alien-mugshots/Mugshots of extra terrestrial aliens taken when being booked into Area 51.png",
  },
  {
    name: "Kroxon",
    testimony: "I'm just tryna find my way back home, you feel me?",
    src: "/alien-mugshots/extraterrestrial-alien-mug-shot-6.png",
  },
  {
    name: "Tythor Qoppa",
    testimony:
      "They say I'm a danger to society, but I'm just a player trying to shine in this game of life.",
    src: "/alien-mugshots/extraterrestrial-alien-mug-shot-7.png",
  },
];

export const ufos: UfoProperties[] = [
  {
    id: 1,
    name: "default boi",
    src: "/ufos/yellow.png",
    dx: 2,
    dy: 1,
    width: 120,
    height: 60,
    refreshRate: 10,
    health: 1,
    rarity: 5,
    score: 25,
    minimumScore: 0,
  },
  {
    id: 2,
    name: "fat boi",
    src: "/ufos/red.png",
    dx: 2,
    dy: 1,
    width: 240,
    height: 120,
    refreshRate: 15,
    health: 3,
    rarity: 3,
    score: 75,
    minimumScore: 100,
  },
  {
    id: 3,
    name: "speedy boi",
    src: "/ufos/blue.png",
    dx: 2,
    dy: 1,
    width: 60,
    height: 30,
    refreshRate: 5,
    health: 1,
    rarity: 3,
    score: 100,
    minimumScore: 200,
  },
  {
    id: 4,
    name: "rare boi",
    src: "/ufos/green.png",
    dx: 2,
    dy: 2,
    width: 100,
    height: 50,
    refreshRate: 7,
    health: 2,
    rarity: 2,
    score: 200,
    minimumScore: 300,
  },
];
