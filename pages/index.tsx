import Image from "next/image";
import styles from "../styles/Home.module.css";
import fs from "fs";

const aliensmeta = [
  {
    name: "Zorgath",
    testimony:
      "I ain't no threat to nobody, boss. I'm just a peaceful alien tryna coexist with y'all.",
  },
  {
    name: "Xenthor-Omega",
    testimony:
      "I didn't do nothing wrong, I was just flexing my skills and they hatin' on me.",
  },
  {
    name: "Ullian 00-11Z",
    testimony:
      "They locked me up for no reason, I'm just a baller trying to get paid.",
  },
  {
    name: "Thorgon",
    testimony:
      "I'm innocent, I swear it on my momma's grave. They got the wrong Arcturian, I was just living my life.",
  },
  {
    name: "Vy'keen",
    testimony:
      "You got the wrong Zeta, homes. I ain't done nothin' to nobody, I swear on my mothership.",
  },
  {
    name: "Wrygon",
    testimony:
      "Yo, I ain't done nothin' wrong, dawg. I was just passin' through, tryna find my way back home.",
  },
  {
    name: "Kroxon",
    testimony: "I'm just tryna find my way back home, you feel me?",
  },
  {
    name: "Tythor Qoppa",
    testimony:
      "They say I'm a danger to society, but I'm just a player trying to shine in this game of life.",
  },
];

import { InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";

interface Alien {
  name: string;
  src: string;
  testimony: string;
}
type Data = { aliens: Alien[] };

export const getServerSideProps: GetServerSideProps<{
  data: Data;
}> = async () => {
  const mugshotFilenames = fs
    .readdirSync("public/alien-mugshots")
    .map((filename) => `/alien-mugshots/${filename}`);

  const aliens: Alien[] = aliensmeta.map((alien, index) => {
    return {
      name: alien.name,
      testimony: alien.testimony,
      src: mugshotFilenames[index],
    };
  });

  const data: Data = { aliens };

  return {
    props: {
      data,
    },
  };
};

const Mugshot = (filename: Alien) => {
  return (
    <div className="item" key={filename.name}>
      <Image src={filename.src} alt="alien" width={223} height={230} />
      <h3>{filename.name}</h3>
      <p>{filename.testimony}</p>
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

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Header />
      <div className="list">
        {data?.aliens?.map((filename) => Mugshot(filename))}
      </div>
    </>
  );
}
