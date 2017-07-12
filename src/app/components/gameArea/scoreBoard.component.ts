import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import Score from '../../gameLogic/Score';
import PlayerColors from '../../gameLogic/enums/PlayerColors';
import Colors from '../../../style/colors';

@Component({
  selector: 'app-scoreboard',
  template: `
    <div id="scoreBoard">
      <app-scoreboard-player-presentation
        [playerName]="blackPlayerName"
        [playerColor]="0"
        [isPlayerTurn]="turn === playerColors.BLACK"
      >
      </app-scoreboard-player-presentation>
      <span class="playerPoints">{{score.blackPoints}}</span>
      <span>-</span>
      <span class="playerPoints">{{score.whitePoints}}</span>
      <app-scoreboard-player-presentation
        [playerName]="whitePlayerName"
        [playerColor]="1"
        [isPlayerTurn]="turn === playerColors.WHITE"
      >
      </app-scoreboard-player-presentation>
    </div>
  `,
  styles: [`
    #scoreBoard {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .playerPoints {
      width: 15px;
      margin: 10px;
      text-align: center;
      color: ${Colors.DARK_GREEN};
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreBoardComponent {
  @Input() score: Score;
  @Input() turn: PlayerColors;
  @Input() blackPlayerName: string;
  @Input() whitePlayerName: string;

  playerColors = PlayerColors;
}
