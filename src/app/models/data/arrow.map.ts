import { EDirection } from '@models/enums';

export const arrowMap = new Map<string, EDirection>([
  ['ArrowUp', EDirection.UP],
  ['ArrowDown', EDirection.DOWN],
  ['ArrowLeft', EDirection.LEFT],
  ['ArrowRight', EDirection.RIGHT],
]);
