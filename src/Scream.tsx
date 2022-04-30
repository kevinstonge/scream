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
import type { Params, Props, Subprops } from './types';
const numberOfFaces: number = 10;
const rand: Function = (min: number, max: number): number => Math.random() * (max - min) + min;
const fA: Function = (time: number, params: Params): number => {
  return (
    params.mag * Math.sin((params.flip * params.freq * time) / 1000 + params.shift) + params.offset
  );
};
class Parameters {
  params: Params;
  constructor(overrides?: Partial<Params>) {
    this.params = {
      flip: [1, -1][Math.floor(rand(0, 2))],
      mag: rand(0, 50),
      offset: rand(0, 0),
      freq: rand(0.3, 1),
      shift: [0, 3.14][Math.floor(rand(0, 2))],
      format: (v: number) => {
        return `${v}%`;
      },
      ...overrides,
    };
  }
}
class Properties implements Props {
  properties: Subprops;
  styleSheet: CSSProperties = {};
  generateStyleSheet(time: number): CSSProperties {
    let css: CSSProperties = {};
    for (let p in this.properties) {
      css[p as keyof Subprops] = this.properties[p as keyof Subprops].format(
        fA(time, this.properties[p as keyof Subprops])
      );
    }
    return css;
  }
  constructor(overrides?: Partial<Params>) {
    this.properties = {
      top: new Parameters().params,
      left: new Parameters().params,
      transform: new Parameters({ format: (v: number): string => `scale(${v}%)` }).params,
      filter: new Parameters({ format: (v: number): string => `blur(${v}px)` }).params,
      opacity: new Parameters().params,
      ...overrides,
    };
  }
}
function Scream() {
  const faces: Props[] = new Array(numberOfFaces).fill({}).map((): Props => new Properties());
  const [styleSheets, setStyleSheets]: [
    CSSProperties[],
    Dispatch<SetStateAction<CSSProperties[]>>
  ] = useState(faces.map((face: Props): CSSProperties => face.generateStyleSheet(0)));

  useEffect(() => {
    requestAnimationFrame(function cb(time: any) {
      setStyleSheets(faces.map((f: Props): CSSProperties => f.generateStyleSheet(time)));
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
