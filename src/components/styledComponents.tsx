import styled from 'styled-components';
const p = { top: '0', left: '0', width: '100%', height: '100%' };
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
`;

const BlurryBackgroundImage = styled.img`
  ${p}
  position: absolute;
  object-fit: cover;
  filter: blur(0.3rem);
  z-index: 50;
`;
const BackgroundImage = styled.img`
  ${p}
  position: absolute;
  object-fit: contain;
  @media (orientation: portrait) {
    object-fit: cover;
  }
  @media (min-aspect-ratio: 3/1) {
    object-fit: cover;
  }
  filter: drop-shadow(0 0 max(2vw, 2vh) black);
  z-index: 100;
`;
const ForegroundImage = styled.img`
  ${p}
  position: absolute;
  object-fit: contain;
`;

export { Container, BlurryBackgroundImage, BackgroundImage, ForegroundImage };
