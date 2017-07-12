import Board from './Board';
import Move from './Move';
import PlayerColors from './enums/PlayerColors';
import GameState from './GameState';
import GameStatuses from './enums/GameStatuses';

export default class ComputerMoveProvider {
  private static readonly HEURISTIC_ESTIMATION_FOR_WINNING_STATE = 10000000000;

  getComputerMove(gameState: GameState, depth: number): Move {
    return this.alphaBeta(
      null,
      gameState,
      depth,
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY
    ).moveMade;
  }

  private alphaBeta(moveMade: Move, gameState: GameState, depth: number, alpha: number, beta: number)
    : { heuristicEstimation: number, moveMade: Move } {
    if (gameState.gameStatus === GameStatuses.ENDED || depth === 0) {
      return { heuristicEstimation: this.getHeuristicEstimation(gameState), moveMade: moveMade }
    }

    const possibleNextSteps: Array<{ move: Move, gameState: GameState }> =
      gameState.gameStatus === GameStatuses.PLAYER_CANT_PLAY ?
        [{ move: null, gameState: gameState.switchTurnWithoutMove() }] :
        gameState.legalMoves.map(move => ({ move: move, gameState: gameState.performMove(move) }));

    if (gameState.turn === PlayerColors.BLACK) {
      let newMove;
      for (let i = 0; i < possibleNextSteps.length; i++) {
        const step = possibleNextSteps[i];
        const moveEstimation = this.alphaBeta(step.move, step.gameState, depth - 1, alpha, beta).heuristicEstimation;
        if (moveEstimation > alpha) {
          alpha = moveEstimation;
          newMove = step.move;
        }
        if (beta <= alpha) {
          break;
        }
      };
      return { heuristicEstimation: alpha, moveMade: newMove}
    } else {
      let newMove;
      for (let i = 0; i < possibleNextSteps.length; i++) {
        const step = possibleNextSteps[i];
        const moveEstimation = this.alphaBeta(step.move, step.gameState, depth - 1, alpha, beta).heuristicEstimation;
        if (moveEstimation < beta) {
          beta = moveEstimation;
          newMove = step.move;
        }
        if (beta <= alpha) {
          break;
        }
      };
      return { heuristicEstimation: beta, moveMade: newMove}
    }
  }

  private getHeuristicEstimation(gameState: GameState): number {
    const pieceDifference = gameState.score.blackPoints - gameState.score.whitePoints;

    if (gameState.gameStatus === GameStatuses.ENDED) {
      if (pieceDifference > 0) {
        return ComputerMoveProvider.HEURISTIC_ESTIMATION_FOR_WINNING_STATE + pieceDifference;
      } else if (pieceDifference < 0) {
        return -ComputerMoveProvider.HEURISTIC_ESTIMATION_FOR_WINNING_STATE + pieceDifference;
      } else {
        return 0;
      }
    }

    const cornerCounters = this.countCorners(gameState.board);

    const isFirstStage = cornerCounters[PlayerColors.BLACK] === 0 && cornerCounters[PlayerColors.WHITE] === 0;

    if (isFirstStage) {
      return -pieceDifference;
    } else {
      const cornerDifference = cornerCounters[PlayerColors.BLACK] - cornerCounters[PlayerColors.WHITE];
      return cornerDifference * Board.SIZE * Board.SIZE + pieceDifference;
    }
  }

  private countCorners(board: Board) {
    const counters = {
      [PlayerColors.BLACK]: 0,
      [PlayerColors.WHITE]: 0
    }

    const countTile = (row, col) => counters[board.tiles[row][col]]++;

    countTile(0, 0);
    countTile(0, Board.SIZE - 1);
    countTile(Board.SIZE - 1, 0);
    countTile(Board.SIZE - 1, Board.SIZE - 1);

    return counters;
  }
}
