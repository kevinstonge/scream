import { CSSProperties } from 'react';

export type ParametersT = {
  flip: number;
  mag: number;
  offset: number;
  freq: number;
  shift: number;
  quantity: number; //gotta get rid of this at some point.
};

export type PropertiesT = {
  top?: ParametersI;
  left?: ParametersI;
  transform?: ParametersI;
  filter?: ParametersI;
  opacity?: ParametersI;
  zIndex?: ParametersI;
  border?: ParametersI;
};

export interface PropertiesI {
  properties: PropertiesT;
  generateStyleSheet(time: number): CSSProperties;
}

export interface ParametersI {
  parameters: ParametersT[];
  format: Function;
  quantity: number;
}
