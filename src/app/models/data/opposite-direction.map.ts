import { EDirection } from '@models/enums';

export const oppositeDirectionMap = new Map<EDirection, EDirection>([
  [EDirection.UP, EDirection.DOWN],
  [EDirection.DOWN, EDirection.UP],
  [EDirection.LEFT, EDirection.RIGHT],
  [EDirection.RIGHT, EDirection.LEFT],
]);
