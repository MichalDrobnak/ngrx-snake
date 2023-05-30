import {
  changedDirection,
  collectedCoin,
  hitTheTail,
  hitTheWall,
  moved,
  spawnedCoin,
} from '@appactions';
import { GAME_SIZE, directionMap } from '@models/data';
import { EDirection } from '@models/enums';
import { IGame, IPoint } from '@models/interfaces';
import { createReducer, on } from '@ngrx/store';
import { cmpPoints } from '@utils';

const CENTER = Math.floor(GAME_SIZE / 2);

const INITIAL_STATE: IGame = {
  points: 0,
  direction: EDirection.UP,
  snake: [{ x: CENTER, y: CENTER }],
  coins: [],
};

export const gameReducer = createReducer(
  INITIAL_STATE,
  on(moved, (state) => ({
    ...state,
    snake: moveSnake(state.snake, state.direction, state.points),
  })),
  on(changedDirection, (state, { direction }) => ({ ...state, direction })),
  on(spawnedCoin, (state, { coin }) => ({
    ...state,
    coins: [...state.coins, coin],
  })),
  on(collectedCoin, (state, { coin: gottenCoin }) => ({
    ...state,
    coins: [...state.coins.filter((coin) => !cmpPoints(coin, gottenCoin))],
    points: state.points + 1,
  })),
  on(hitTheTail, hitTheWall, () => INITIAL_STATE)
);

const moveSnake = (
  snake: IPoint[],
  direction: EDirection,
  points: number
): IPoint[] => {
  const { x: lastX, y: lastY } = snake[snake.length - 1];
  const { x: dirX, y: dirY } = directionMap.get(direction)!;
  const movedSnake = snake.length - 1 === points ? snake.slice(1) : snake;

  return [...movedSnake, { x: lastX + dirX, y: lastY + dirY }];
};
