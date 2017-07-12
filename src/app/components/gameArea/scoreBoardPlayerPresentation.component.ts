import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import PlayerColors from '../../gameLogic/enums/PlayerColors';

@Component({
  selector: 'app-scoreboard-player-presentation',
  template: `
    <div
      class="playerPresentation"
      [class.playingPlayerHighlight]="isPlayerTurn"
      [style.color]="playerColor === playerColors.BLACK ? 'black' : 'white'"
    >
      <span>{{playerName}}</span>
      <div id="pieceContainer">
        <app-piece [pieceColor]="playerColor"></app-piece>
      </div>
    </div>
  `,
  styleUrls: ['scoreBoardPlayerPresentation.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreBoardPlayerPresentationComponent {
  @Input() playerName: string;
  @Input() playerColor: PlayerColors;
  @Input() isPlayerTurn: boolean;

  playerColors = PlayerColors;
}
