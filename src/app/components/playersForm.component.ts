import { Component, OnInit } from '@angular/core'
import Players from '../gameLogic/Players';
import { GameService } from '../services/game.service';
import PlayerColors from '../gameLogic/enums/PlayerColors';
import PlayerData from '../gameLogic/PlayerData';
import Colors from '../../style/colors';
import FixedSizes from '../../style/commonFixedSizes';

@Component({
  selector: 'app-players-form',
  template: `
    <div class="newGameForm">
      <span class="title">Players for New Game</span>
      <app-player-subform [playerColor]="playerColors.BLACK" [player]="players.black"></app-player-subform>
      <app-player-subform [playerColor]="playerColors.WHITE" [player]="players.white"></app-player-subform>
      <button [disabled]="!isFormLegal()" (click)="submit()">Start New Game</button>
    </div>
  `,
  styles: [`
    .newGameForm {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      background: ${Colors.DARK_GREEN};
      box-sizing: border-box;
      border: ${FixedSizes.WIDE_BORDER}px solid ${Colors.BLACK};
      height: ${FixedSizes.BOARD_SIZE}px;
      margin-top: 2px;
      padding-top: 2px;
      padding-bottom: 10px;
    }
    .title {
      justify-self: start;
      font-size: 15px;
      font-weight: bold;
      text-decoration: underline;
      color: white;
    }
  `]
})
export class PlayersFormComponent implements OnInit {
  private static readonly MIN_ALLOWED_LEVEL = 1;
  private static readonly MAX_ALLOWED_LEVEL = 5;

  playerColors = PlayerColors;

  players = {
        black: {
          name: '',
          isComputer: false,
          computerLevel: 1
        },
        white: {
          name: '',
          isComputer: false,
          computerLevel: 1
        }
      };

  constructor(private gameService: GameService) { }
  ngOnInit(): void {
    this.gameService.players.subscribe(x => {
      this.players = {
        black: {
          name: x.get(PlayerColors.BLACK).name,
          isComputer: x.get(PlayerColors.BLACK).isComputerPlayer,
          computerLevel: x.get(PlayerColors.BLACK).computerPlayerLevel
        },
        white: {
          name: x.get(PlayerColors.WHITE).name,
          isComputer: x.get(PlayerColors.WHITE).isComputerPlayer,
          computerLevel: x.get(PlayerColors.WHITE).computerPlayerLevel
        }
      };
    });
  }

  submit() {
    this.gameService.restartGame(
      new Players(
        new PlayerData(this.players.black.name, this.players.black.isComputer, this.players.black.computerLevel),
        new PlayerData(this.players.white.name, this.players.white.isComputer, this.players.white.computerLevel),
      )
    );
  }

  isFormLegal() {
    return this.players.black.computerLevel >= PlayersFormComponent.MIN_ALLOWED_LEVEL &&
      this.players.black.computerLevel <= PlayersFormComponent.MAX_ALLOWED_LEVEL &&
      this.players.white.computerLevel >= PlayersFormComponent.MIN_ALLOWED_LEVEL &&
      this.players.white.computerLevel <= PlayersFormComponent.MAX_ALLOWED_LEVEL;
  }
}
