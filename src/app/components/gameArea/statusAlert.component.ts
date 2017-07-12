import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import Score from '../../gameLogic/Score';
import PlayerColors from '../../gameLogic/enums/PlayerColors';
import Colors from '../../../style/colors';
import FixedSizes from '../../../style/commonFixedSizes';

@Component({
  selector: 'app-status-alert',
  template: `
    <div class="container">
      <p>{{text}}</p>
      <button *ngIf="confirmButtonText" (click)="confirm()">{{confirmButtonText}}</button>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      margin-top: 20px;
      min-width: ${FixedSizes.BOARD_SIZE / 2}px;
      height: ${FixedSizes.TILE_SIZE}px;
      background: ${Colors.DARK_GREEN};
      color: ${Colors.WHITE};
      border: 1px solid ${Colors.BLACK};
      border-radius: 4px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusAlertComponent {
  @Input() text: string;
  @Input() confirmButtonText: boolean;

  @Output() onConfirmed = new EventEmitter();

  confirm() {
    this.onConfirmed.emit();
  }
}
