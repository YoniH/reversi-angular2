import { Component, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import Board from '../../gameLogic/Board';
import Move from '../../gameLogic/Move';

@Component({
  selector: 'app-board',
  template: `
      <div class="board">
        <div class="row" *ngFor="let row of [0,1,2,3,4,5,6,7];">
          <app-tile
            *ngFor="let col of [0,1,2,3,4,5,6,7];"
            [row]="row"
            [col]="col"
            [pieceColor]="getPieceColorForTile(row, col)"
            [displayAsMovePreview]="displayAsMovePreview(row, col)"
            [displayAsFlippingPreview]="displayAsFlippingPreview(row, col)"
          >
          </app-tile>
        </div>
      </div>
  `,
  styles: [`
    .board {
      display: flex;
      flex-direction: column;
      border-spacing: 0px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .row {
      display: flex;
      flex-direction: row;
    }
    app-tile {
      margin: 2px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent {
  @Input() board: Board;
  @Input() preview: { move: Move, tilesToBeFlipped: { row: number, col: number }[] };

  getPieceColorForTile(row: number, col: number) {
    if (this.board.tiles[row][col] !== null) {
      return this.board.tiles[row][col];
    }

    if (this.displayAsMovePreview(row, col)) {
      return this.preview.move.playerColor;
    }

    return null;
  }

  displayAsMovePreview(row: number, col: number) {
    return this.preview && this.preview.move.row === row && this.preview.move.col === col;
  }

  displayAsFlippingPreview(row: number, col: number) {
    return this.preview && this.preview.tilesToBeFlipped.filter(x => x.row === row && x.col === col).length > 0;
  }
}
