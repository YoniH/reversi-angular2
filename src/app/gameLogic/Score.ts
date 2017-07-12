import PlayerColors from './enums/PlayerColors';

export default class Score {
  blackPoints: number;
  whitePoints: number;

  constructor(blackPoints: number, whitePoints: number) {
    this.blackPoints = blackPoints;
    this.whitePoints = whitePoints;
  }

  getPoints(player: PlayerColors) {
    switch (player) {
      case PlayerColors.BLACK:
        return this.blackPoints;
      case PlayerColors.WHITE:
        return this.whitePoints;
    }
  }
};
