import { EDirection } from '@models/enums';
import { IPoint } from '.';

export interface IGame {
  points: number;
  direction: EDirection;
  snake: IPoint[];
  coins: IPoint[];
}
