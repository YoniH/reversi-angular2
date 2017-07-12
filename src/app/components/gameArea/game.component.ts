import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { TileInteractionService } from '../../services/tileInteraction.service';
import Players from '../../gameLogic/Players';
import GameState from '../../gameLogic/GameState';
import Move from '../../gameLogic/Move';
import PlayerColors from '../../gameLogic/enums/PlayerColors';
import GameStatuses from '../../gameLogic/enums/GameStatuses';
import ComputerMoveStatuses from '../../gameLogic/enums/ComputerMoveStatuses';

@Component({
  selector: 'app-game',
  template: `
    <div class="game">
      <app-board
        [board]="gameState.board"
        [preview]="preview"
      >
      </app-board>
      <app-scoreboard
        [score]="gameState.score"
        [turn]="gameState.turn"
        [blackPlayerName]="players.get(playerColors.BLACK).name"
        [whitePlayerName]="players.get(playerColors.WHITE).name"
      >
      </app-scoreboard>
      <app-status-alert
        *ngIf="gameState.gameStatus === gameStatuses.PLAYER_CANT_PLAY"
        [text]="'Can\\'t play'"
        [confirmButtonText]="'Ok'"
        (onConfirmed)="onCantPlayClicked()"
      >
      </app-status-alert>
      <app-status-alert
        *ngIf="gameState.gameStatus === gameStatuses.ENDED"
        [text]="getGameEndText()"
      >
      </app-status-alert>
    </div>
  `,
  styleUrls: ['game.scss']
})
export class GameComponent implements OnInit {
  playerColors = PlayerColors;
  gameStatuses = GameStatuses;

  players: Players;
  gameState: GameState;
  computerMoveProgress: { status: ComputerMoveStatuses, move?: Move };

  isComputerPlayerTurn: boolean;

  preview: { move: Move, tilesToBeFlipped: { row: number, col: number }[] } = null;

  hoveredTile: { row: number, col: number };

  constructor(private gameService: GameService, private tileInteractionService: TileInteractionService) { }
  ngOnInit(): void {
    this.gameService.players.subscribe(x => this.players = x);

    this.gameService.computerMoveProgress.subscribe(x => {
      this.computerMoveProgress = x;
      this._updatePreview();
    });

    this.gameService.gameState.subscribe(x => {
      this.gameState = x;

      this.isComputerPlayerTurn = this.players.get(x.turn).isComputerPlayer;

      this._updatePreview();

      if (this.isComputerPlayerTurn && this.gameState.gameStatus === GameStatuses.ONGOING) {
        this.gameService.performComputerMove();
      }
    });

    this.tileInteractionService.hovered.subscribe(x => {
      this.hoveredTile = x;
      this._updatePreview();
    });

    this.tileInteractionService.clicked.subscribe(x => {
      if (x) {
        this._onClick(x.row, x.col);
      }
    });
  }

  private _isMoveLegal(move: Move) {
    return this.gameState.legalMoves.filter(x => x.equals(move)).length > 0;
  }

  private _onClick(row: number, col: number) {
    if (this.isComputerPlayerTurn) {
      return;
    }

    const move = new Move(this.gameState.turn, row, col);
    if (this._isMoveLegal(move)) {
      this.gameService.performMove(move);
    }
  }

  private _updatePreview() {
    if (this.isComputerPlayerTurn) {
      this.computerMoveProgress.status === ComputerMoveStatuses.DISPLAYING ?
        this._setPreview(this.computerMoveProgress.move) : this._clearPreview();
    } else {
        if (!this.hoveredTile) {
          this._clearPreview();
          return;
        }

        const move = new Move(this.gameState.turn, this.hoveredTile.row, this.hoveredTile.col);
        if (this._isMoveLegal(move)) {
          this._setPreview(move);
        } else {
          this._clearPreview();
        }
      }
  }

  private _setPreview(move: Move) {
    this.preview = { move: move, tilesToBeFlipped: this.gameState.board.getTilesToBeFlipped(move) };
  }

  private _clearPreview() {
      this.preview = null;
  }

  onCantPlayClicked() {
    this.gameService.switchTurnWithoutMove();
  }

  getGameEndText() {
    if (this.gameState.winner === PlayerColors.BLACK || this.gameState.winner === PlayerColors.WHITE) {
      const name = this.players.get(this.gameState.winner).name;
      return `${name} ${name.toLowerCase() === 'you' ? 'win' : 'wins'}!`;
    } else {
      return 'Game is tied!'
    }
  }
}
