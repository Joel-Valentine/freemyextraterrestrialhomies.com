import React, { useState, useEffect } from "react";

const UFO = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [dx, setDx] = useState(1);
  const [dy, setDy] = useState(2);

  useEffect(() => {
    const screenWidth = window.innerWidth - 120;
    const screenHeight = window.document.documentElement.scrollHeight - 60;

    const move = setInterval(() => {
      if (x + dx > screenWidth || x + dx < 0) {
        setDx(-dx);
      }
      if (y + dy > screenHeight || y + dy < 0) {
        setDy(-dy);
      }
      setX(x + dx);
      setY(y + dy);
    }, 10);

    return () => clearInterval(move);
  });

  return (
    <img
      src="/ufo clipart surrounded by white background.png"
      style={{ position: "absolute", left: x, top: y }}
      width={120}
      height={60}
    />
  );
};

export default UFO;
