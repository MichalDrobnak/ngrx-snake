import { Injectable } from '@angular/core';
import {
  changedDirection,
  collectedCoin,
  hitTheTail,
  hitTheWall,
  moved,
  spawnedCoin,
} from '@appactions';
import {
  COIN_SPAWN_INTERVAL,
  GAME_SIZE,
  MOVE_INTERVAL,
  oppositeDirectionMap,
} from '@models/data';
import { EDirection } from '@models/enums';
import { IGame, IPoint } from '@models/interfaces';
import { Store } from '@ngrx/store';
import { selectCoins, selectDirection, selectSnake } from '@selectors';
import { cmpPoints } from '@utils';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  first,
  interval,
  switchMap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  readonly snake$ = this.store.select(selectSnake);
  readonly coins$ = this.store.select(selectCoins);
  readonly direction$ = this.store.select(selectDirection);

  private _stopped = false;
  private readonly _intervalLength$ = new BehaviorSubject<number>(
    MOVE_INTERVAL
  );

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
        this.store.dispatch(changedDirection({ direction: newDirection }));
      }
    });
  }

  changeSpeed(speed: number): void {
    this._intervalLength$.next(speed);
  }

  toggle(): void {
    this._stopped = !this._stopped;
  }

  private _handleMovement(): void {
    this._intervalLength$
      .pipe(
        switchMap((intervalLength) => interval(intervalLength)),
        filter(() => !this._stopped)
      )
      .subscribe(() => {
        this.store.dispatch(moved());
      });
  }

  private _handleGameOver(): void {
    this.snake$.pipe(filter(() => !this._stopped)).subscribe((snake) => {
      const head = snake[snake.length - 1];

      if (
        head.x < 0 ||
        head.x >= GAME_SIZE ||
        head.y < 0 ||
        head.y >= GAME_SIZE
      ) {
        this.store.dispatch(hitTheWall());
      }

      const intersection = snake.filter((point) => cmpPoints(head, point));

      if (intersection.length > 1) {
        this.store.dispatch(hitTheTail());
      }
    });
  }

  private _handleCoinSpawning(): void {
    interval(COIN_SPAWN_INTERVAL)
      .pipe(
        switchMap(() => this.coins$.pipe(first())),
        filter(() => !this._stopped)
      )
      .subscribe((coins) => {
        let newCoin = this._randomPoint();

        while (coins.some((coin) => cmpPoints(coin, newCoin))) {
          newCoin = this._randomPoint();
        }

        this.store.dispatch(spawnedCoin({ coin: newCoin }));
      });
  }

  private _handleGrowth(): void {
    combineLatest({ coins: this.coins$, snake: this.snake$ }).subscribe(
      ({ coins, snake }) => {
        const head = snake[snake.length - 1];

        if (coins.some((coin) => cmpPoints(head, coin))) {
          this.store.dispatch(
            collectedCoin({ coin: { x: head.x, y: head.y } })
          );
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
