import Image from "next/image";
import styles from "../styles/Home.module.css";
import fs from "fs";
import { aliensmeta } from "./aliens.json";

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
    <>
      <div className="item">
        <Image
          src={filename.src}
          alt="alien"
          width={223}
          height={230}
          key={filename.name}
        />
        <h3>{filename.name}</h3>
        <p>{filename.testimony}</p>
      </div>
    </>
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
        {data.aliens.map((filename) => Mugshot(filename))}
      </div>
    </>
  );
}
