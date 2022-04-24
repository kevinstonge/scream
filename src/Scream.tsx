import bg from './bg_16.jpg';
import fg from './fg_16.png';
import {
  Container,
  BlurryBackgroundImage,
  BackgroundImage,
  ForegroundImage,
} from './components/styledComponents';
import { useEffect, useState } from 'react';
type face = {
  xFunc: Function;
  yFunc: Function;
  x: number;
};

function Scream() {
  const fA = (time: number, mag: number, offset: number, freq: number) => {
    return mag * Math.sin((freq * time) / 1000) + offset;
  };
  const numberOfFaces = 7;
  const initialFaces = new Array(numberOfFaces).fill({}).map((f) => {
    const xMag: number = Math.random() * 50;
    const xOffset: number = Math.random() * 0;
    const xFreq: number = Math.random();
    const yMag: number = Math.random() * 50;
    const yOffset: number = Math.random() * 0;
    const yFreq: number = Math.random();
    return {
      xFunc: (time: number) => {
        return fA(time, xMag, xOffset, xFreq);
      },
      yFunc: (time: number) => {
        return fA(time, yMag, yOffset, yFreq);
      },
    };
  });
  const [faces, setFaces]: [any, any] = useState(initialFaces);
  useEffect(() => {
    requestAnimationFrame(function cb(time: any) {
      const newFaces = faces.map((face: face) => {
        const newFace = {
          x: face.xFunc(time),
          y: -face.yFunc(time),
        };
        return newFace;
      });
      setFaces(newFaces);
      if (time) requestAnimationFrame(cb);
    });
  }, []);
  return (
    <Container>
      <BlurryBackgroundImage src={bg} />
      <BackgroundImage src={bg} />
      {faces.map((f: any, i: number) => {
        return (
          <ForegroundImage src={fg} style={{ left: `${f.x}%`, top: `${f.y}%` }} key={`face${i}`} />
        );
      })}
    </Container>
  );
}

export default Scream;
