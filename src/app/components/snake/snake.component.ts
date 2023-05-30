import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GAME_SIZE, arrowMap } from '@models/data';
import { IPoint } from '@models/interfaces';
import { RangePipe } from '@pipes';
import { GameService } from '@services';
import { cmpPoints } from '@utils';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss'],
  standalone: true,
  imports: [CommonModule, RangePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnakeComponent implements OnInit {
  readonly gameSize = GAME_SIZE;
  readonly snakeSignal: Signal<IPoint[]>;
  readonly coinsSignal: Signal<IPoint[]>;

  constructor(private _gameS: GameService) {
    this.snakeSignal = toSignal(_gameS.snake$, { requireSync: true });
    this.coinsSignal = toSignal(_gameS.coins$, { requireSync: true });
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    const newDirection = arrowMap.get(event.key);

    if (newDirection !== undefined) {
      this._gameS.changeDirection(newDirection);
    }
  }

  ngOnInit(): void {
    this._gameS.game();
  }

  isSnake(tileIndex: number, snake: IPoint[]): boolean {
    const point = this._pointFromIndex(tileIndex);
    return snake.some((snakePoint) => cmpPoints(point, snakePoint));
  }

  isCoin(tileIndex: number, coins: IPoint[]): boolean {
    const point = this._pointFromIndex(tileIndex);
    return coins.some((coinPoint) => cmpPoints(point, coinPoint));
  }

  onSetSpeed(event: SubmitEvent, value: string): void {
    event.preventDefault();
    this._gameS.changeSpeed(Number(value));
  }

  onToggle(): void {
    this._gameS.toggle();
  }

  private _pointFromIndex(tileIndex: number): IPoint {
    return {
      x: tileIndex % GAME_SIZE,
      y: Math.floor(tileIndex / GAME_SIZE),
    };
  }
}
