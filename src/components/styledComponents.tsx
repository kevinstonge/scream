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
`;

const BackgroundImage = styled.img`
  ${p}
  position: absolute;
  object-fit: contain;
`;
const ForegroundImage = styled.img`
  ${p}
  position: absolute;
  object-fit: contain;
  //transform: translate(0%, 0%) scale(100%);
  //filter: hue-rotate(220deg);
`;

export { Container, BlurryBackgroundImage, BackgroundImage, ForegroundImage };
