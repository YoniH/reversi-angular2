import PlayerColors from './enums/PlayerColors';
import Move from './Move';
import Score from './Score';

export default class Board {
  static readonly SIZE = 8;

  private static readonly Directions = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];

  tiles: Array<Array<number>>;

  constructor() {
    this.tiles = new Array(Board.SIZE);
    for (let row = 0; row < Board.SIZE; row++) {
      this.tiles[row] = new Array(Board.SIZE);
    }
    for (let row = 0; row < Board.SIZE; row++) {
      for (let col = 0; col < Board.SIZE; col++) {
        this.tiles[row][col] = null;
      }
    }
    this.tiles[3][3] = PlayerColors.WHITE;
    this.tiles[3][4] = PlayerColors.BLACK;
    this.tiles[4][3] = PlayerColors.BLACK;
    this.tiles[4][4] = PlayerColors.WHITE;
  }

  clone() {
    const clonedBoard = new Board();
    for (let row = 0; row < Board.SIZE; row++) {
      for (let col = 0; col < Board.SIZE; col++) {
        clonedBoard.tiles[row][col] = this.tiles[row][col];
      }
    }
    return clonedBoard;
  }

  getScore() {
    const pieceCount: { [player: number]: number; } = {
      [PlayerColors.BLACK]: 0,
      [PlayerColors.WHITE]: 0
    };
    for (let row = 0; row < Board.SIZE; row++) {
      for (let col = 0; col < Board.SIZE; col++) {
        if (!this.isTileEmpty(row, col)) {
          pieceCount[this.tiles[row][col]]++;
        }
      }
    }
    return new Score(pieceCount[PlayerColors.BLACK], pieceCount[PlayerColors.WHITE]);
  }

  getLegalMoves(player: PlayerColors): Move[] {
    const legalMoves = [];
    for (let row = 0; row < Board.SIZE; row++) {
      for (let col = 0; col < Board.SIZE; col++) {
        const move = new Move(player, row, col);
        if (this.isMoveLegal(move)) {
          legalMoves.push(move);
        }
      }
    }
    return legalMoves;
  }

  performMove(move: Move) {
    const clonedBoard = this.clone();

    // place piece
    clonedBoard.tiles[move.row][move.col] = move.playerColor;

    // flip other pieces
    const tilesToBeFlipped = this.getTilesToBeFlipped(move);
    for (const tile of tilesToBeFlipped) {
      clonedBoard.tiles[tile.row][tile.col] = move.playerColor;
    }

    return clonedBoard;
  }

  getTilesToBeFlipped(move: Move): { row: number, col: number }[] {
    const result = [];
    for (const direction of Board.Directions) {
      if (this.isMoveLegalInDirection(move, direction[0], direction[1])) {
        let currentRow = move.row;
        let currentCol = move.col;
        do {
          currentRow += direction[0];
          currentCol += direction[1];

          if (currentRow < 0 || currentRow > Board.SIZE - 1 || currentCol < 0 || currentCol > Board.SIZE - 1) {
            break;
          }

          if (this.tiles[currentRow][currentCol] === move.playerColor) {
            break;
          }

          result.push({ row: currentRow, col: currentCol });

        } while (true);
      }
    }
    return result;
  }

  isMoveLegal(move: Move) {
    if (!this.isTileEmpty(move.row, move.col)) {
      return false;
    }

    for (const direction of Board.Directions) {
      if (this.isMoveLegalInDirection(move, direction[0], direction[1])) {
        return true;
      }
    }

    return false;
  }

  isTileEmpty(row: number, col: number) {
    return this.tiles[row][col] === null;
  }

  private isMoveLegalInDirection(move: Move, rowDirection, colDirection) {
    let oppositeColorEncountered = false;
    let row = move.row;
    let col = move.col;
    do {
      row += rowDirection;
      col += colDirection;

      if (row < 0 || row > Board.SIZE - 1 || col < 0 || col > Board.SIZE - 1) {
        return false;
      }

      if (this.isTileEmpty(row, col)) {
        return false;
      } else if (this.tiles[row][col] === move.playerColor) {
        return oppositeColorEncountered;
      } else {
        oppositeColorEncountered = true;
      }
    } while (true);
  }
}
