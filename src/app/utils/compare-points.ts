import { IPoint } from '../models';

export const cmpPoints = (
  { x: x1, y: y1 }: IPoint,
  { x: x2, y: y2 }: IPoint
): boolean => {
  return x1 === x2 && y1 === y2;
};
