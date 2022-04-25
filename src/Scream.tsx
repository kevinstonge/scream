import bg from './bg_16.jpg';
import fg from './fg_16.png';
import {
  Container,
  BlurryBackgroundImage,
  BackgroundImage,
  ForegroundImage,
} from './components/styledComponents';
import { Dispatch, Key, SetStateAction, useEffect, useState } from 'react';
import { CSSProperties } from 'styled-components';
import { ObjectType } from 'typescript';
type FParams = {
  flip: number;
  mag: number;
  offset: number;
  freq: number;
  shift: number;
};
const rand = (min: number, max: number): number => Math.random() * (max - min) + min;
const numberOfFaces = 20;
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
      const defaultParams = (overrides?: Partial<FParams>) => ({
        flip: [1, -1][Math.floor(rand(0, 2))],
        mag: rand(0, 50),
        offset: rand(0, 0),
        freq: rand(0.3, 1),
        shift: [0, 3.14][Math.floor(rand(0, 2))],
        ...overrides,
      });
      return {
        top: { params: defaultParams(), format: (v: number) => `${v}%` },
        left: { params: defaultParams(), format: (v: number) => `${v}%` },
        transform: {
          params: defaultParams({ mag: rand(0, 100), offset: 100 }),
          format: (v: number) => `scale(${v}%)`,
        },
      };
    });
    const cssProperties = (time: number, i: number): CSSProperties => {
      const css: CSSProperties = {};
      Object.keys(properties[0]).forEach((k) => {
        const { params, format } = properties[i][k as keyof typeof properties[0]];
        css[k as keyof typeof properties[0]] = format(fA(time, params));
      });
      return css;
    };
    requestAnimationFrame(function cb(time: any) {
      setFaces(
        faces.map((e, i) => {
          return cssProperties(time, i);
        })
      );
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
