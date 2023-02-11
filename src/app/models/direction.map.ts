import { EDirection } from './direction.enum';
import { IPoint } from './point.interface';

export const directionMap = new Map<EDirection, IPoint>([
  [EDirection.UP, { x: 0, y: -1 }],
  [EDirection.DOWN, { x: 0, y: 1 }],
  [EDirection.LEFT, { x: -1, y: 0 }],
  [EDirection.RIGHT, { x: 1, y: 0 }],
]);
