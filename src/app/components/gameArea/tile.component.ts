import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import PlayerColors from '../../gameLogic/enums/PlayerColors';
import { TileInteractionService } from '../../services/tileInteraction.service';
import Colors from '../../../style/colors';
import FixedSizes from '../../../style/commonFixedSizes';

@Component({
  selector: 'app-tile',
  template: `
    <div
      [class.flipping-preview]="displayAsFlippingPreview"
      (click)="emitClickEvent()"
      (mouseenter)="emitHoverEvent()"
      (mouseleave)="emitEndHoverEvent()"
    >
      <app-piece
        [pieceColor]="pieceColor"
        [displayAsMovePreview]="displayAsMovePreview"
      >
      </app-piece>
    </div>
  `,
  styles: [`
    div {
      width: ${FixedSizes.TILE_SIZE}px;
      height: ${FixedSizes.TILE_SIZE}px;
      background: ${Colors.DARK_GREEN};
      border: 1px solid ${Colors.BLACK};
    }
    .flipping-preview {
      border: 1px solid ${Colors.RED};
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent {
  @Input() row: number;
  @Input() col: number;
  @Input() pieceColor: PlayerColors;
  @Input() displayAsMovePreview: boolean;
  @Input() displayAsFlippingPreview: boolean;

  constructor(private tileInteractionService: TileInteractionService) { }

  emitHoverEvent() {
    this.tileInteractionService.emitHoverEvent(this.row, this.col);
  }

  emitEndHoverEvent() {
    this.tileInteractionService.emitEndHoverEvent();
  }

  emitClickEvent() {
    this.tileInteractionService.emitClickEvent(this.row, this.col);
  }
}
