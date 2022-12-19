import { useState, useEffect } from "react";
import Image from "next/image";
import UnidentifiedFlyingObject from "./ufo";
import { UfoComponent } from "./api/types";
import Chatroom from "./chatroom";
import { aliensmeta } from "./api/data";
import { Alien } from "./api/types";

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

  /**
   *  TODO: Instead of a counter for UFOs, make it a score that resets on page load. Store the
   *  highest score and show it. Show most recent score addition above total score for a short
   *  time or until another score addition occurs. Add colours to score additions based on magnitude
   *  of score.
   */
  const [ufos, setUfos] = useState<UfoComponent[]>([]);
  const [ufoCount, setUfoCount] = useState(0);
  const handleLogoClick = () => setUfos([...ufos, { id: Date.now() }]);

  useEffect(() => setUfoCount(+(localStorage.getItem("ufoCount") ?? 0)), []);

  useEffect(() => {
    const handleExplodeUfo = (event: any) => {
      const ufo = event.detail;

      setTimeout(() => {
        setUfos((prevUfos) => prevUfos.filter((item) => item.id !== ufo.id));

        setUfoCount((prevUfoExplosionCount) => {
          const newUfoExplosionCount = (prevUfoExplosionCount += 1);
          localStorage.setItem("ufoCount", newUfoExplosionCount.toString());

          return newUfoExplosionCount;
        });
      }, 1000);
    };

    window.addEventListener("explodeUfo", handleExplodeUfo);

    return () => window.removeEventListener("explodeUfo", handleExplodeUfo);
  }, [ufos]);

  return (
    <>
      <div className="header-container">
        <h1 className="header-title">FREE MY EXTRATERRESTRIAL HOMIES</h1>
        <div onClick={handleLogoClick}>
          <Logo />
        </div>

        {ufos.map((ufo) => (
          <UnidentifiedFlyingObject key={ufo.id} ufo={ufo} />
        ))}

        <p className="header-subtitle">
          A Campaign for Equal Rights for All Beings
        </p>

        {ufoCount !== 0 && (
          <p className="header-subtitle">UFOs: {ufoCount.toLocaleString()}</p>
        )}

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
