import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { ufos } from "./api/data";
import {
  UfoComponent,
  UfoProperties,
  ExtendedUfoProperties,
} from "./api/types";

const explosionImage = "/clipart explosion with white background.png";

function randomDirectionFactor() {
  const denominator = Math.floor(Math.random() * (300 - 50 + 1) + 50);
  const useSin = Math.random() > 0.5 ? true : false;

  return (val: number) =>
    useSin ? Math.sin(val / denominator) : Math.cos(val / denominator);
}

function randomUfo(currentScore: number): ExtendedUfoProperties {
  const weightedUfos = ufos
    .filter((ufo) => ufo.minimumScore <= currentScore)
    .flatMap((ufo): UfoProperties[] => new Array(ufo.rarity).fill(ufo));

  const ufo = (weightedUfos[
    Math.round(Math.random() * (weightedUfos.length - 1))
  ] ?? ufos[0]) as ExtendedUfoProperties;

  ufo.xFactor = randomDirectionFactor();
  ufo.yFactor = randomDirectionFactor();

  return { ...ufo };
}

const UnidentifiedFlyingObject = ({
  ufo,
  currentScore,
}: {
  ufo: UfoComponent;
  currentScore: number;
}) => {
  const ufoProperties = useMemo(() => randomUfo(currentScore), []);

  const [x, setX] = useState(-100);
  const [y, setY] = useState(-100);
  const [dx, setDx] = useState(ufoProperties.dx);
  const [dy, setDy] = useState(ufoProperties.dy);
  const [imageUrl, setImageUrl] = useState(ufoProperties.src);
  const [outOfXBounds, setOutOfXBounds] = useState(false);
  const [outOfYBounds, setOutOfYBounds] = useState(false);
  const [initialSet, setInitialSet] = useState(true);

  function clickUfo() {
    ufoProperties.health -= 1;
    const { score, health } = ufoProperties;

    if (health === 0) {
      setImageUrl(explosionImage);
      window.dispatchEvent(
        new CustomEvent("destroyUfo", { detail: { ufo, score } })
      );
    }
  }

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
      setDx((Math.random() > 0.5 ? 1 : -1) * dx);
      setDy((Math.random() > 0.5 ? 1 : -1) * dy);
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

      setX(x + dx + ufoProperties.xFactor(y));
      setY(y + dy + ufoProperties.yFactor(x));
    }, ufoProperties.refreshRate);

    return () => clearInterval(move);
  }, [x, y]);

  return (
    <>
      {!initialSet && (
        <Image
          onClick={clickUfo}
          src={imageUrl}
          alt="Unidentified Flying Object"
          style={{ position: "absolute", left: x, top: y }}
          className="unselectable"
          width={ufoProperties.width}
          height={ufoProperties.height}
        />
      )}
    </>
  );
};

export default UnidentifiedFlyingObject;
