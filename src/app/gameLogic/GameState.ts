import Board from './Board';
import PlayerColors from './enums/PlayerColors';
import Score from './Score';
import Move from './Move';
import GameStatuses from './enums/GameStatuses';
import Utils from '../utils';

export default class GameState {
  board: Board;
  turn: PlayerColors;
  score: Score;
  legalMoves: Move[];
  gameStatus: GameStatuses;
  winner: PlayerColors;

  static getForNewGame(): GameState {
    return new GameState(new Board(), PlayerColors.BLACK);
  }

  constructor(board: Board, turn: PlayerColors) {
    this.board = board;
    this.turn = turn;
    this.score = board.getScore();
    this.legalMoves = board.getLegalMoves(turn);

    if (this.legalMoves.length > 0) {
      this.gameStatus = GameStatuses.ONGOING;
    } else if (board.getLegalMoves(PlayerColors.getInverse(turn)).length > 0) {
      this.gameStatus = GameStatuses.PLAYER_CANT_PLAY;
    } else {
      this.gameStatus = GameStatuses.ENDED;
      this.turn = null;
      if (this.score.blackPoints > this.score.whitePoints) {
        this.winner = PlayerColors.BLACK;
      } else if (this.score.whitePoints > this.score.blackPoints) {
        this.winner = PlayerColors.WHITE;
      } else {
        this.winner = null;
      }
    }
  }

  performMove(move: Move): GameState {
    if (this.gameStatus !== GameStatuses.ONGOING) {
      throw new Error('cannot perform move');
    }

    if (move.playerColor !== this.turn) {
      throw new Error('wrong player')
    }

    return new GameState(
      this.board.performMove(move),
      PlayerColors.getInverse(move.playerColor)
    )
  }

  switchTurnWithoutMove(): GameState {
    if (this.gameStatus !== GameStatuses.PLAYER_CANT_PLAY) {
      throw new Error('can switch turn only if player cannot play');
    }

    return new GameState(
      this.board.clone(),
      PlayerColors.getInverse(this.turn)
    )
  }
};

