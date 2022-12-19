import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { ufos } from "./api/data";
import { UfoProperties } from "./api/types";

const explosionImage = "/clipart explosion with white background.png";

const UnidentifiedFlyingObject = ({ ufo }: { ufo: { id: number } }) => {
  const [ufoPropertiesValue] = useState<UfoProperties>({} as UfoProperties);
  const ufoProperties = useMemo(
    () => ufos[Math.floor(Math.random() * ufos.length)],
    [ufoPropertiesValue]
  );

  const [x, setX] = useState(-100);
  const [y, setY] = useState(-100);
  const [dx, setDx] = useState(ufoProperties.dx);
  const [dy, setDy] = useState(ufoProperties.dy);
  const [imageUrl, setImageUrl] = useState(ufoProperties.src);
  const [outOfXBounds, setOutOfXBounds] = useState(false);
  const [outOfYBounds, setOutOfYBounds] = useState(false);
  const [initialSet, setInitialSet] = useState(true);

  const explodeUfo = () => {
    setImageUrl(explosionImage);
    window.dispatchEvent(new CustomEvent("explodeUfo", { detail: ufo }));
  };

  useEffect(() => {
    const screenWidth = window.innerWidth - ufoProperties.width;
    const screenHeight = window.innerHeight - ufoProperties.height;
    const windowHeight =
      window.document.documentElement.scrollHeight - ufoProperties.height;

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

      setX(x + dx + ufoProperties.xFactor(x, y));
      setY(y + dy + ufoProperties.yFactor(x, y));
    }, ufoProperties.refreshRate);

    return () => clearInterval(move);
  }, [x, y]);

  return (
    <Image
      onClick={explodeUfo}
      src={imageUrl}
      alt="Unidentified Flying Object"
      style={{ position: "absolute", left: x, top: y }}
      className="unselectable"
      width={ufoProperties.width}
      height={ufoProperties.height}
    />
  );
};

export default UnidentifiedFlyingObject;
