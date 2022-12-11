import Image from "next/image";

const aliensmeta: Alien[] = [
  {
    name: "Zorgath",
    testimony:
      "I ain't no threat to nobody, boss. I'm just a peaceful alien tryna coexist with y'all.",
    src: "/alien-mugshots/alien-2.png",
  },
  {
    name: "Xenthor-Omega",
    testimony:
      "I didn't do nothing wrong, I was just flexing my skills and they hatin' on me.",
    src: "/alien-mugshots/extraterrestrial alien mug shots with a UFO in area 51 (1).png",
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
    name: "Vy'keen",
    testimony:
      "You got the wrong Zeta, homes. I ain't done nothin' to nobody, I swear on my mothership.",
    src: "/alien-mugshots/extraterrestrial-alien-mug-shot-4.png",
  },
  {
    name: "Wrygon",
    testimony:
      "Yo, I ain't done nothin' wrong, dawg. I was just passin' through, tryna find my way back home.",
    src: "/alien-mugshots/extraterrestrial-alien-mug-shot-5.png",
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

interface Alien {
  name: string;
  src: string;
  testimony: string;
}

const Mugshot = (alien: Alien) => {
  return (
    <div className="item" key={alien.name}>
      <Image src={alien.src} alt="alien" width={223} height={230} />
      <h3>{alien.name}</h3>
      <p>{alien.testimony}</p>
    </div>
  );
};

const Header = () => {
  return (
    <header>
      <div className="logo">Free My Extraterrestrial Homies</div>
      <nav>
        <ul className="nav-links">
          <li>
            <a href="#">Catalog</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default function Home() {
  return (
    <>
      <Header />
      <div className="list">{aliensmeta.map((alien) => Mugshot(alien))}</div>
    </>
  );
}
