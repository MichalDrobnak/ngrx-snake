import { createAction, props } from '@ngrx/store';
import { EDirection, IPoint } from '../models';

export const move = createAction('[Game] Move');

export const changeDirection = createAction(
  '[Game] Change direction',
  props<{ direction: EDirection }>()
);

export const getCoin = createAction(
  '[Game] Get coin',
  props<{ coin: IPoint }>()
);

export const spawnCoin = createAction(
  '[Game] Spawn coin',
  props<{ coin: IPoint }>()
);

export const gameOver = createAction('[Game] Game over');
