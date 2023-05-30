import { EDirection } from '@models/enums';
import { IPoint } from '@models/interfaces';
import { createAction, props } from '@ngrx/store';

export const moved = createAction('[Game] Moved');

export const changedDirection = createAction(
  '[Game] Changed direction',
  props<{ direction: EDirection }>()
);

export const collectedCoin = createAction(
  '[Game] Collected a coin',
  props<{ coin: IPoint }>()
);

export const spawnedCoin = createAction(
  '[Game] Spawned a coin',
  props<{ coin: IPoint }>()
);

export const hitTheWall = createAction('[Game] Hit the wall');

export const hitTheTail = createAction('[Game] Hit the tail');
