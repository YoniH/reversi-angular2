import PlayerColors from './enums/PlayerColors';

export default class Move {
  playerColor: PlayerColors;
  row: number;
  col: number;

  constructor(playerColor: PlayerColors, row: number, col: number) {
    this.playerColor = playerColor;
    this.row = row;
    this.col = col;
  }

  equals(other: Move) {
    return JSON.stringify(this) === JSON.stringify(other);
  }
}
