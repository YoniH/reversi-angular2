import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import PlayerColors from '../../gameLogic/enums/PlayerColors';

@Component({
  selector: 'app-piece',
  template: `
    <svg>
      <circle
        *ngIf="pieceColor !== null"
        [ngClass]="pieceColor === playerColors.BLACK ? 'black-player' : 'white-player'"
        [class.move-preview]="displayAsMovePreview"
      />
    </svg>
  `,
  styleUrls: ['piece.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieceComponent {
  @Input() pieceColor: PlayerColors;
  @Input() displayAsMovePreview: boolean;

  playerColors = PlayerColors;
}
