import React, { useState, useEffect } from "react";
import Image from "next/image";

const ufoImage = "/ufo clipart surrounded by white background.png";
const explosionImage = "/clipart explosion with white background.png";

const UFO = () => {
  const [x, setX] = useState(-100);
  const [y, setY] = useState(-100);
  const [dx, setDx] = useState(2);
  const [dy, setDy] = useState(1);
  const [imageUrl, setImageUrl] = useState(ufoImage);
  const [outOfXBounds, setOutOfXBounds] = useState(false);
  const [outOfYBounds, setOutOfYBounds] = useState(false);
  const [initialSet, setInitialSet] = useState(true);

  const explodeUfo = () => {
    setImageUrl(explosionImage);
    window.dispatchEvent(new CustomEvent("explodeUfo"));
  };

  useEffect(() => {
    const screenWidth = window.innerWidth - 120;
    const screenHeight = window.innerHeight - 60;
    const windowHeight = window.document.documentElement.scrollHeight - 60;

    if (imageUrl === explosionImage) {
      return;
    }

    if (initialSet) {
      setX(Math.random() * screenWidth);
      setY(Math.random() * screenHeight);
      setInitialSet(false);
    }

    const move = setInterval(() => {
      if (x + dx > screenWidth || x + dx < 0) {
        if (!outOfXBounds) {
          setDx(-dx);
          setOutOfXBounds(true);
        }
      } else {
        setOutOfXBounds(false);
      }

      if (y + dy > windowHeight || y + dy < 0) {
        if (!outOfYBounds) {
          setDy(-dy);
          setOutOfYBounds(true);
        }
      } else {
        setOutOfYBounds(false);
      }

      setX(x + dx + Math.sin(y / 200));
      setY(y + dy + Math.cos(x / 200));
    }, 6);

    return () => clearInterval(move);
  }, [x, y]);

  return (
    <Image
      onClick={explodeUfo}
      src={imageUrl}
      alt="Unidentified Flying Object"
      style={{ position: "absolute", left: x, top: y }}
      className="unselectable"
      width={120}
      height={60}
    />
  );
};

export default UFO;
