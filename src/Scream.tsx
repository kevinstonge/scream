import bg from './bg_16.jpg';
import fg from './fg_16.png';
import {
  Container,
  BlurryBackgroundImage,
  BackgroundImage,
  ForegroundImage,
} from './components/styledComponents';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CSSProperties } from 'react';
import type { Params, Face } from './types';

const numberOfFaces: number = 10;
const rand: Function = (min: number, max: number): number => Math.random() * (max - min) + min;
const calculateParams = (overrides?: Partial<Params>): Params => ({
  flip: [1, -1][Math.floor(rand(0, 2))],
  mag: rand(0, 50),
  offset: rand(0, 0),
  freq: rand(0.3, 1),
  shift: [0, 3.14][Math.floor(rand(0, 2))],
  format: (v: number) => {
    return `${v}%`;
  },
  ...overrides,
});

function Scream() {
  const [faces, setFaces]: [Face[], Dispatch<SetStateAction<Face[]>>] = useState(
    new Array(numberOfFaces).fill({}).map(
      (): Face => ({
        css: {},
        top: calculateParams(),
        left: calculateParams(),
        transform: calculateParams({ format: (v: number) => `scale(${v}%)` }),
        // transform:{scale:calculateParams(),rotate:calculateParams()} ??
        filter: calculateParams({ format: (v: number) => `hue-rotate(${v * 180}deg)` }),
        opacity: calculateParams({ format: (v: number) => `${v * 5}%` }),
      })
    )
  );

  const fA: Function = (time: number, params: Params): number => {
    return (
      params.mag * Math.sin((params.flip * params.freq * time) / 1000 + params.shift) +
      params.offset
    );
  };

  const calculateCSS: Function = (face: any, time: number): CSSProperties => {
    const css: any = {};
    for (let p in face) {
      if (p !== 'css') {
        css[p] = face[p].format(fA(time, face['top']));
        // css[p as keyof typeof css] = face[p as keyof Face].format(time); ????
      }
    }
    return css;
  };
  useEffect(() => {
    requestAnimationFrame(function cb(time: any) {
      const newFaces: Face[] = faces.map((face: any) => {
        return { ...face, css: calculateCSS(face, time) };
      });
      setFaces(newFaces);
      if (time) requestAnimationFrame(cb);
    });
  }, []);
  return (
    <Container>
      <BlurryBackgroundImage src={bg} />
      <BackgroundImage src={bg} />
      {faces.map((face: Face, i: number) => {
        return <ForegroundImage src={fg} style={face.css} key={`face${i}`} />;
      })}
    </Container>
  );
}

export default Scream;
