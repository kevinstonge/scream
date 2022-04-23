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
  x: number;
};
const perlin = require('perlin-noise');
const perlinX = perlin.generatePerlinNoise(100, 100);
//approach:
//use perlin noise to add values to x,y,z positions
//also use some function to add additional amounts to x,y,z positions depending on proximity to the center.
//the perlin noise values can be positive or negative, so that faces should change direction randomly (but smoothly)
//the additional amounts added are always positive (relative to the "origin"), so will prevent faces from swinging back across the center.

//more details on the math:
//perlin value + central value = current speed in one dimension
//perlin value updated every 1s (maybe?), central value depends on location (probably simple formula to calculate it)
//

function Scream() {
  const [faces, setFaces]: [any, any] = useState([{ x: 0, vx: 1 }, { x: 0, vx: 1 }]);
  const animate = () => {
    let previous = 0;
    requestAnimationFrame(function cb(time: any) {
      const elapsed = time - previous
      const newFaces = faces.map((face: face) => {
        const newFace = { 
          x: face.x + (elapsed/1000),
          vx: perlinX[1]
        };
        return newFace;
      });
      setFaces(newFaces);
      if (time) requestAnimationFrame(cb); // queue request for next frame
    });
  };
  useEffect(() => {
    animate();
  }, []);
  return (
    <Container>
      <BlurryBackgroundImage src={bg} />
      <BackgroundImage src={bg} />
      {/* <ForegroundImage src={fg} style={{ border: 'none' }} /> */}
      {faces.map((f: any, i: number) => {
        return <ForegroundImage src={fg} style={{ left: `${f.x}%` }} key={`face${i}`} />;
      })}
    </Container>
  );
}

export default Scream;
