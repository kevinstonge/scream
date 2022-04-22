import bg from './bg_16.jpg';
import fg from './fg_16.png';
import bgBlurry from './bg_blurry_16.jpg';
import {
  Container,
  BlurryBackgroundImage,
  BackgroundImage,
  ForegroundImage,
} from './components/styledComponents';
import { useEffect } from 'react';

function Scream() {
  useEffect(() => {
    console.log('yup');
  }, []);
  return (
    <Container>
      <BlurryBackgroundImage src={bgBlurry} />
      <BackgroundImage src={bg} />
      <ForegroundImage src={fg} style={{ border: 'none' }} />
    </Container>
  );
}

export default Scream;
