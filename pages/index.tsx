import { useState, useEffect } from "react";
import Image from "next/image";
import UFO from "./ufo";
import { Chatroom } from "./chatroom";
import { aliensmeta } from "./data";
import { Alien } from "./types";

const Mugshot = (alien: Alien) => {
  return (
    <div className="item" key={alien.name}>
      <Image src={alien.src} alt="alien" width={223} height={230} />
      <h3>{alien.name}</h3>
      <p>{alien.testimony}</p>
    </div>
  );
};

const Logo = () => {
  return (
    <div className="header-logo">
      <Image
        src="/The head of the extra terrestrial freedom group logo similar to CIA and FBI but for freeing aliens.png"
        alt="logo"
        width={70}
        height={70}
      />
    </div>
  );
};

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(aliensmeta);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const results = aliensmeta.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const [showUfo, setShowUfo] = useState(true);

  const handleLogoClick = () => setShowUfo(!showUfo);

  useEffect(() =>
    window.addEventListener("explodeUfo", () =>
      setTimeout(() => setShowUfo(false), 1000)
    )
  );

  return (
    <>
      <div className="header-container">
        <h1 className="header-title">FREE MY EXTRATERRESTRIAL HOMIES</h1>
        <div onClick={handleLogoClick}>
          <Logo />
        </div>

        {showUfo && <UFO />}

        <p className="header-subtitle">
          A Campaign for Equal Rights for All Beings
        </p>
        <div className="header-search">
          <input
            type="text"
            className="header-search-input"
            onChange={handleSearch}
            value={searchTerm}
            placeholder="Search"
          />
        </div>
      </div>
      <AllAliens aliens={searchResults} />
    </>
  );
};

const AllAliens = (props: { aliens: Alien[] }) => {
  const { aliens } = props;
  return <div className="list">{aliens.map((alien) => Mugshot(alien))}</div>;
};

export default function Home() {
  const [searchResults] = useState(aliensmeta);

  return (
    <>
      <Header />
      <Chatroom />
    </>
  );
}
