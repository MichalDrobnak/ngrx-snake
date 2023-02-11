import { IPoint } from '.';
import { EDirection } from './direction.enum';

export interface IGame {
  points: number;
  direction: EDirection;
  snake: IPoint[];
  coins: IPoint[];
}
