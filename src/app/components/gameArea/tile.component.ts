import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import PlayerColors from '../../gameLogic/enums/PlayerColors';
import { TileInteractionService } from '../../services/tileInteraction.service';

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
  styleUrls: ['tile.scss'],
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
