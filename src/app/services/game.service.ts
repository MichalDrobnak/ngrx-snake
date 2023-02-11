import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval, switchMap, first, combineLatest } from 'rxjs';
import {
  move,
  gameOver,
  spawnCoin,
  getCoin,
  changeDirection,
} from '../actions';
import {
  IPoint,
  MOVE_INTERVAL,
  COIN_SPAWN_INTERVAL,
  GAME_SIZE,
  IGame,
  EDirection,
  oppositeDirectionMap,
} from '../models';
import { selectSnake, selectCoins, selectDirection } from '../selectors';
import { cmpPoints } from '../utils/compare-points';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  readonly snake$ = this.store.select(selectSnake);
  readonly coins$ = this.store.select(selectCoins);
  readonly direction$ = this.store.select(selectDirection);

  constructor(public store: Store<{ game: IGame }>) {}

  game(): void {
    this._handleMovement();
    this._handleGameOver();
    this._handleCoinSpawning();
    this._handleGrowth();
  }

  changeDirection(newDirection: EDirection): void {
    this.direction$.pipe(first()).subscribe((direction) => {
      if (oppositeDirectionMap.get(newDirection) !== direction) {
        this.store.dispatch(changeDirection({ direction: newDirection }));
      }
    });
  }

  private _handleMovement(): void {
    interval(MOVE_INTERVAL).subscribe(() => this.store.dispatch(move()));
  }

  private _handleGameOver(): void {
    this.snake$.subscribe((snake) => {
      const head = snake[snake.length - 1];
      const intersection = snake.filter((point) => cmpPoints(head, point));

      if (
        head.x < 0 ||
        head.x >= GAME_SIZE ||
        head.y < 0 ||
        head.y >= GAME_SIZE ||
        intersection.length > 1
      ) {
        this.store.dispatch(gameOver());
      }
    });
  }

  private _handleCoinSpawning(): void {
    interval(COIN_SPAWN_INTERVAL)
      .pipe(switchMap(() => this.coins$.pipe(first())))
      .subscribe((coins) => {
        let newCoin = this._randomPoint();

        while (coins.some((coin) => cmpPoints(coin, newCoin))) {
          newCoin = this._randomPoint();
        }

        this.store.dispatch(spawnCoin({ coin: newCoin }));
      });
  }

  private _handleGrowth(): void {
    combineLatest({ coins: this.coins$, snake: this.snake$ }).subscribe(
      ({ coins, snake }) => {
        const head = snake[snake.length - 1];

        if (coins.some((coin) => cmpPoints(head, coin))) {
          this.store.dispatch(getCoin({ coin: { x: head.x, y: head.y } }));
        }
      }
    );
  }

  private _randomPoint(): IPoint {
    return {
      x: Math.round(Math.random() * GAME_SIZE),
      y: Math.round(Math.random() * GAME_SIZE),
    };
  }
}
