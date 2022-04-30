import { CSSProperties } from 'react';

export type Params = {
  flip: number;
  mag: number;
  offset: number;
  freq: number;
  shift: number;
  format: Function;
};

export type Subprops = {
  top: Params;
  left: Params;
  transform: Params;
  filter: Params;
  opacity: Params;
};

export interface Props {
  properties: Subprops;
  styleSheet: CSSProperties;
  generateStyleSheet(time: number): CSSProperties;
}
