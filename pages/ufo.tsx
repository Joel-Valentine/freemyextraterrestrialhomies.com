import React, { useState, useEffect } from "react";
import Image from "next/image";

const ufoImage = "/ufo clipart surrounded by white background.png";
const explosionImage = "/clipart explosion with white background.png";

const UFO = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [dx, setDx] = useState(2);
  const [dy, setDy] = useState(1);
  const [imageUrl, setImageUrl] = useState(ufoImage);

  const explodeUfo = () => {
    setImageUrl(explosionImage);
    window.dispatchEvent(new CustomEvent("explodeUfo"));
  };

  useEffect(() => {
    if (imageUrl === explosionImage) {
      return;
    }

    const screenWidth = window.innerWidth - 120;
    const screenHeight = window.document.documentElement.scrollHeight - 60;

    const move = setInterval(() => {
      if (x + dx > screenWidth || x + dx < 0) {
        setDx(-dx);
      }
      if (y + dy > screenHeight || y + dy < 0) {
        setDy(-dy);
      }
      setX(x + dx + Math.sin(y / 200));
      setY(y + dy + Math.cos(x / 200));
    }, 10);

    return () => clearInterval(move);
  });

  return (
    <Image
      onClick={explodeUfo}
      src={imageUrl}
      alt="Unidentified Flying Object"
      style={{ position: "absolute", left: x, top: y }}
      width={120}
      height={60}
    />
  );
};

export default UFO;
