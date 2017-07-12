import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs/Rx';

import GameState from '../gameLogic/GameState';
import GamesStatuses from '../gameLogic/enums/GameStatuses';
import PlayerData from '../gameLogic/PlayerData';
import Players from '../gameLogic/Players';
import Move from '../gameLogic/Move';
import ComputerMoveStatuses from '../gameLogic/enums/ComputerMoveStatuses';
import ComputerMoveProvider from '../gameLogic/ComputerMoveProvider';
import Utils from '../utils';

@Injectable()
export class GameService {
  private static readonly MINIMUM_TIME_BEFORE_DISPLAYING_COMPUTER_MOVE_PREVIEW = 1500;
  private static readonly COMPUTER_MOVE_PREVIEW_DISPLAY_TIME = 1500;

  private _currentGameId: string = Utils.uuidV4();

  private _computerMoveProvider = new ComputerMoveProvider();

  private _gameState: BehaviorSubject<GameState> = new BehaviorSubject<GameState>(GameState.getForNewGame());
  public readonly gameState: Observable<GameState> = this._gameState.asObservable();

  private _players: BehaviorSubject<Players> =
    new BehaviorSubject<Players>(new Players (
      new PlayerData('You', false, 1),
      new PlayerData('Computer', true, 2)
    ));
  public readonly players: Observable<Players> = this._players.asObservable();

  private _computerMoveProgress: BehaviorSubject<{ status: ComputerMoveStatuses, move?: Move }> =
    new BehaviorSubject<{ status: ComputerMoveStatuses, move?: Move }>({ status: ComputerMoveStatuses.NOT_PLAYING });
  public readonly computerMoveProgress: Observable<{ status: ComputerMoveStatuses, move?: Move }> =
  this._computerMoveProgress.asObservable();

  performMove(move) {
    if (this._gameState.getValue().gameStatus !== GamesStatuses.ONGOING) {
      throw new Error('cannot move, game is not ongoing');
    }

    this._gameState.next(this._gameState.getValue().performMove(move));
  }

  switchTurnWithoutMove() {
    if (this._gameState.getValue().gameStatus !== GamesStatuses.PLAYER_CANT_PLAY) {
      throw new Error('can switch turn without moving only when a player cannot play');
    }

    this._gameState.next(this._gameState.getValue().switchTurnWithoutMove());
  }

  async performComputerMove() {
    if (this._gameState.getValue().gameStatus !== GamesStatuses.ONGOING) {
      throw new Error('cannot move, game is not ongoing');
    }

    const gameId = this._currentGameId;

    this._computerMoveProgress.next({ status: ComputerMoveStatuses.CALCULATING_AND_WAITING });
    await Utils.delay(0); // enabling ui update before starting the long running task

    const turn = this._gameState.getValue().turn;
    const level = this._players.getValue().get(turn).computerPlayerLevel;

    const calculationStartTime = Utils.now();
    const computerMove = this._computerMoveProvider.getComputerMove(this._gameState.getValue(), level);
    const calculationTime = Utils.now() - calculationStartTime;
    const timeLeftToWait = GameService.MINIMUM_TIME_BEFORE_DISPLAYING_COMPUTER_MOVE_PREVIEW - calculationTime;
    if (timeLeftToWait > 0) {
      await Utils.delay(timeLeftToWait);
    }

    if (gameId !== this._currentGameId) { return; }
    this._computerMoveProgress.next({ status: ComputerMoveStatuses.DISPLAYING, move: computerMove });
    await Utils.delay(GameService.COMPUTER_MOVE_PREVIEW_DISPLAY_TIME);

    if (gameId !== this._currentGameId) { return; }
    this.performMove(computerMove);
    this._computerMoveProgress.next({ status: ComputerMoveStatuses.NOT_PLAYING });
  }

  restartGame(players: Players) {
    this._currentGameId = Utils.uuidV4();
    this._players.next(players);
    this._gameState.next(GameState.getForNewGame());
    this._computerMoveProgress.next({ status: ComputerMoveStatuses.NOT_PLAYING });
  }
}
