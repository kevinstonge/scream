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
import type { ParametersT, PropertiesI, PropertiesT, ParametersI } from './types';
const numberOfFaces: number = 16;
const rand: Function = (min: number, max: number): number => Math.random() * (max - min) + min;
const sinusoidal: Function = (time: number, params: ParametersT): number => {
  const fA = () =>
    params.mag * Math.sin(params.flip * params.freq * time * 0.001 + params.shift) + params.offset;
  const fB = () =>
    1.5 * params.mag * Math.sin(params.flip * params.freq * time * 0.0015 + params.shift * 2) +
    params.offset;
  return fA() + fB();
};
class Parameters implements ParametersI {
  parameters: ParametersT[];
  quantity: number;
  format: Function;
  constructor(overrides: any) {
    this.format = overrides?.format
      ? overrides.format
      : (v: number[]) => {
          console.log(v);
          return `${v[0] * 10}%`;
        };
    this.quantity = overrides?.quantity || 1;
    this.parameters = new Array(this.quantity).fill({}).map(
      (): ParametersT => ({
        flip: [1, -1][Math.floor(rand(0, 2))],
        mag: rand(10, 50),
        offset: rand(0, 0),
        freq: rand(0.3, 0.8),
        shift: [0, 3.14][Math.floor(rand(0, 2))],
        quantity: 1,
        ...overrides,
      })
    );
  }
}
class Properties implements PropertiesI {
  properties: PropertiesT;
  generateStyleSheet(time: number): CSSProperties {
    let css: CSSProperties = {};
    for (const [p, v] of Object.entries(this.properties)) {
      css[p as keyof PropertiesT] = v.format(
        v.parameters.map((p) => {
          return sinusoidal(time, p);
        })
      );
    }

    return css;
  }
  constructor() {
    const xy: ParametersI = new Parameters({ quantity: 2 });
    const transform: ParametersI = new Parameters({ quantity: 5 });
    this.properties = {
      top: { ...xy, format: (v: number[]): string => `${v[0]}%` },
      left: { ...xy, format: (v: number[]): string => `${v[1]}%` },
      transform: {
        ...transform,
        format: (v: number[]): string =>
          `scale(${v[0] / 30}) skew(${v[2] / 5}deg,${v[3] / 5}deg) rotate(${v[4] * 4}deg)`,
      },
      filter: {
        ...transform,
        format: (v: number[]): string => `blur(${v[0] / 1200}vw) hue-rotate(${20 * v[2]}deg)`,
      },
      opacity: { ...transform, format: (v: number[]): string => `${(1 / v[0]) * 70}` },
      zIndex: { ...transform, format: (v: number[]): string => `${Math.floor(v[0] * 10)}` },
    };
  }
}
function Scream() {
  const faces: PropertiesI[] = new Array(numberOfFaces)
    .fill({})
    .map((): PropertiesI => new Properties());
  const [styleSheets, setStyleSheets]: [
    CSSProperties[],
    Dispatch<SetStateAction<CSSProperties[]>>
  ] = useState(faces.map((face: PropertiesI): CSSProperties => face.generateStyleSheet(0)));
  useEffect(() => {
    requestAnimationFrame(function cb(time: any) {
      setStyleSheets(faces.map((f: PropertiesI): CSSProperties => f.generateStyleSheet(time)));
      if (time) requestAnimationFrame(cb);
    });
  }, []);
  return (
    <Container>
      <BlurryBackgroundImage src={bg} />
      <BackgroundImage src={bg} />
      {styleSheets.map((style, i: number) => {
        return <ForegroundImage src={fg} style={style} key={`face${i}`} />;
      })}
    </Container>
  );
}
export default Scream;
