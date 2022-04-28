import { CSSProperties } from 'react';

export type Params = {
  flip: number;
  mag: number;
  offset: number;
  freq: number;
  shift: number;
  format: Function;
};
export type Face = {
  top: Params;
  left: Params;
  transform: Params;
  filter: Params;
  opacity: Params;
  css: CSSProperties;
};
