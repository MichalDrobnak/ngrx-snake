import { createReducer, on } from '@ngrx/store';
import {
  changeDirection,
  gameOver,
  getCoin,
  move,
  spawnCoin,
} from '../actions';
import { directionMap, EDirection, IGame, IPoint } from '../models';
import { GAME_SIZE } from '../models/constants';
import { cmpPoints } from '../utils/compare-points';

const CENTER = Math.floor(GAME_SIZE / 2);

const INITIAL_STATE: IGame = {
  points: 0,
  direction: EDirection.UP,
  snake: [{ x: CENTER, y: CENTER }],
  coins: [],
};

export const gameReducer = createReducer(
  INITIAL_STATE,
  on(move, (state) => ({
    ...state,
    snake: moveSnake(state.snake, state.direction, state.points),
  })),
  on(changeDirection, (state, { direction }) => ({ ...state, direction })),
  on(spawnCoin, (state, { coin }) => ({
    ...state,
    coins: [...state.coins, coin],
  })),
  on(getCoin, (state, { coin: gottenCoin }) => ({
    ...state,
    coins: [...state.coins.filter((coin) => !cmpPoints(coin, gottenCoin))],
    points: state.points + 1,
  })),
  on(gameOver, () => INITIAL_STATE)
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
