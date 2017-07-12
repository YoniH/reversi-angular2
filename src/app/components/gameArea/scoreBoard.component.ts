import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import Score from '../../gameLogic/Score';
import PlayerColors from '../../gameLogic/enums/PlayerColors';

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
  styleUrls: ['scoreboard.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreBoardComponent {
  @Input() score: Score;
  @Input() turn: PlayerColors;
  @Input() blackPlayerName: string;
  @Input() whitePlayerName: string;

  playerColors = PlayerColors;
}
