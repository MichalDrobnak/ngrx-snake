import { createSelector } from '@ngrx/store';
import { IAppState, IGame } from '../models';

const selectGame = ({ game }: IAppState) => game;

export const selectSnake = createSelector(
  selectGame,
  ({ snake }: IGame) => snake
);

export const selectCoins = createSelector(
  selectGame,
  ({ coins }: IGame) => coins
);

export const selectDirection = createSelector(
  selectGame,
  ({ direction }: IGame) => direction
);
