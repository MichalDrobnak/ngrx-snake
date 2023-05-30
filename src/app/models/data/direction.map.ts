import { EDirection } from '@models/enums';
import { IPoint } from '@models/interfaces';

export const directionMap = new Map<EDirection, IPoint>([
  [EDirection.UP, { x: 0, y: -1 }],
  [EDirection.DOWN, { x: 0, y: 1 }],
  [EDirection.LEFT, { x: -1, y: 0 }],
  [EDirection.RIGHT, { x: 1, y: 0 }],
]);
