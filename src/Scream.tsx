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
function Scream() {
  const [faces, setFaces]: [any, any] = useState([{ x: 0 }, { x: 0 }]);
  const animate = () => {
    requestAnimationFrame(function cb(elapsedTime: any) {
      // console.log(elapsedTime);
      const newFaces = faces.map((face: face) => {
        const newFace = { ...face, x: face.x + elapsedTime / 500 };
        return newFace;
      });
      setFaces(newFaces);
      if (elapsedTime) requestAnimationFrame(cb); // queue request for next frame
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
      {faces.map((f: any) => {
        return <ForegroundImage src={fg} style={{ left: f.x }} />;
      })}
    </Container>
  );
}

export default Scream;
