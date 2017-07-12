import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import PlayerColors from '../../gameLogic/enums/PlayerColors';
import Colors from '../../../style/colors';
import FixedSizes from '../../../style/commonFixedSizes';

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
  styles: [`
    circle {
      cx: ${FixedSizes.TILE_SIZE / 2}px;
      cy: ${FixedSizes.TILE_SIZE / 2}px;
      r: ${FixedSizes.TILE_SIZE / 3}px;
    }
    .black-player {
      fill: ${Colors.BLACK}
    }
    .white-player {
      fill: ${Colors.WHITE}
    }
    .move-preview {
      opacity: 0.35;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieceComponent {
  @Input() pieceColor: PlayerColors;
  @Input() displayAsMovePreview: boolean;

  playerColors = PlayerColors;
}
