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
      return params.mag * Math.sin((params.freq * time) / 1000 - params.shift) + params.offset;
    };
    const universalParams = initialFaces.map(() => {
      const universalParamValues = {
        mag: rand(0, 50),
        offset: rand(0, 180),
        freq: rand(0.3, 1),
        shift: rand(0, 180),
      };
      return {
        top: {
          ...universalParamValues,
          mag: -rand(0, 50),
        },
        left: {
          ...universalParamValues,
        },
      };
    });
    const properties = (time: number, i: number): CSSProperties => {
      return {
        top: `${fA(time, universalParams[i]['top'])}%`,
        left: `${fA(time, universalParams[i]['left'])}%`,
      };
    };

    requestAnimationFrame(function cb(time: any) {
      setFaces(
        faces.map((e, i) => {
          return properties(time, i);
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
