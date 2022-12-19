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

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const results = aliensmeta.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }

  const [ufoComponents, setUfoComponents] = useState<UfoComponent[]>([]);
  const [ufoScore, setUfoScore] = useState(-1);
  const [ufoRecentScore, setUfoRecentScore] = useState(0);
  const [ufoHighScore, setUfoHighScore] = useState(0);

  function spawnUfo() {
    setUfoComponents([...ufoComponents, { id: Date.now() }]);
    if (ufoScore < 0) setUfoScore(0);
  }

  function destroyUfo(
    event: CustomEvent<{ ufo: UfoComponent; score: number }>
  ) {
    const { ufo, score } = event.detail;

    setUfoRecentScore(score);

    setTimeout(() => {
      // after 1000ms...
      setUfoComponents((prevUfos) => prevUfos.filter((u) => u.id !== ufo.id));

      setUfoScore((prevUfoScore) => {
        const newScore = (prevUfoScore += score);

        if (newScore > ufoHighScore) {
          localStorage.setItem("ufoHighScore", newScore.toString());
          setUfoHighScore(newScore);
        }

        return newScore;
      });

      setUfoRecentScore(0);
    }, 1000);
  }

  useEffect(() => {
    setUfoHighScore(+(localStorage.getItem("ufoHighScore") ?? 0));

    window.addEventListener(
      "destroyUfo",
      destroyUfo as EventListenerOrEventListenerObject
    );

    return () =>
      window.removeEventListener(
        "destroyUfo",
        destroyUfo as EventListenerOrEventListenerObject
      );
  });

  return (
    <>
      <div className="header-container">
        <h1 className="header-title">FREE MY EXTRATERRESTRIAL HOMIES</h1>
        <div onClick={spawnUfo} className="unselectable">
          <Logo />
        </div>

        <p className="header-subtitle">
          A Campaign for Equal Rights for All Beings
        </p>

        {ufoScore >= 0 && (
          <div>
            <p className="score-text">
              Score: {ufoScore.toLocaleString()}
              {ufoRecentScore !== 0 && (
                <span className="green-text"> +{ufoRecentScore}</span>
              )}
            </p>
            <p
              className={
                ufoScore === ufoHighScore
                  ? "score-text green-text"
                  : "score-text"
              }
            >
              High Score: {ufoHighScore.toLocaleString()}
            </p>
          </div>
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

      {ufoComponents.map((ufo) => (
        <UnidentifiedFlyingObject
          key={ufo.id}
          ufo={ufo}
          currentScore={ufoScore}
        />
      ))}

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
