import { EDirection } from './direction.enum';

export const arrowMap = new Map<string, EDirection>([
  ['ArrowUp', EDirection.UP],
  ['ArrowDown', EDirection.DOWN],
  ['ArrowLeft', EDirection.LEFT],
  ['ArrowRight', EDirection.RIGHT],
]);
