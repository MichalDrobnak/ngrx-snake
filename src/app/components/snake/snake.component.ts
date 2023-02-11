import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { IPoint } from 'src/app/models';
import { arrowMap } from 'src/app/models/arrow.map';
import { GAME_SIZE } from 'src/app/models/constants';
import { RangePipe } from 'src/app/pipes/range.pipe';
import { GameService } from 'src/app/services/game.service';
import { cmpPoints } from 'src/app/utils/compare-points';

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

  constructor(public gameS: GameService) {}

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    const newDirection = arrowMap.get(event.key);

    if (newDirection !== undefined) {
      this.gameS.changeDirection(newDirection);
    }
  }

  ngOnInit(): void {
    this.gameS.game();
  }

  isSnake(tileIndex: number, snake: IPoint[]): boolean {
    const point = this._pointFromIndex(tileIndex);
    return snake.some((snakePoint) => cmpPoints(point, snakePoint));
  }

  isCoin(tileIndex: number, coins: IPoint[]): boolean {
    const point = this._pointFromIndex(tileIndex);
    return coins.some((coinPoint) => cmpPoints(point, coinPoint));
  }

  private _pointFromIndex(tileIndex: number): IPoint {
    return {
      x: tileIndex % GAME_SIZE,
      y: Math.floor(tileIndex / GAME_SIZE),
    };
  }
}
