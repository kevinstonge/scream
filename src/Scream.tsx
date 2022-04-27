import bg from './bg_16.jpg';
import fg from './fg_16.png';
import {
  Container,
  BlurryBackgroundImage,
  BackgroundImage,
  ForegroundImage,
} from './components/styledComponents';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CSSProperties } from 'styled-components';
type FParams = {
  flip: number;
  mag: number;
  offset: number;
  freq: number;
  shift: number;
  format: Function;
};
const rand = (min: number, max: number): number => Math.random() * (max - min) + min;
const numberOfFaces = 30;
const initialFaces = new Array(numberOfFaces).fill({});
function Scream() {
  const [faces, setFaces]: [CSSProperties[], Dispatch<SetStateAction<any[]>>] =
    useState(initialFaces);
  useEffect(() => {
    const fA = (time: number, params: FParams): number => {
      return (
        params.mag * Math.sin((params.flip * params.freq * time) / 1000 + params.shift) +
        params.offset
      );
    };
    const properties = initialFaces.map(() => {
      const generateRandomizedParams = (overrides?: Partial<FParams>) => ({
        flip: [1, -1][Math.floor(rand(0, 2))],
        mag: rand(0, 50),
        offset: rand(0, 0),
        freq: rand(0.3, 1),
        shift: [0, 3.14][Math.floor(rand(0, 2))],
        format: (v: number) => `${v}%`,
        ...overrides,
      });
      const zParams = {
        mag: 0.5,
        offset: 1.5,
        flip: 1,
        freq: rand(0.3, 1),
      };
      return {
        top: generateRandomizedParams(),
        left: generateRandomizedParams(),
        transform: generateRandomizedParams({
          ...zParams,
          format: (v: number) => `scale(${v}) rotate(${v * 360}deg)`,
        }),
        filter: generateRandomizedParams({
          ...zParams,
          format: (v: number) => `blur(${v * 1.2}px) hue-rotate(${v * 360}deg)`,
        }),
        opacity: generateRandomizedParams({
          format: (v: number) => `${v * 5}%`,
        }),
      };
    });
    const cssProperties = (time: number, i: number): CSSProperties => {
      const css: CSSProperties = {};
      Object.keys(properties[0]).forEach((k) => {
        const params = properties[i][k as keyof typeof properties[0]];
        css[k as keyof typeof properties[0]] = params.format(fA(time, params));
      });
      return css;
    };
    requestAnimationFrame(function cb(time: any) {
      setFaces(initialFaces.map((e, i) => cssProperties(time, i)));
      if (time) requestAnimationFrame(cb);
    });
  }, []);
  return (
    <Container>
      <BlurryBackgroundImage src={bg} />
      <BackgroundImage src={bg} />
      {faces.map((f: CSSProperties, i: number) => {
        return <ForegroundImage src={fg} style={f} key={`face${i}`} />;
      })}
    </Container>
  );
}

export default Scream;
