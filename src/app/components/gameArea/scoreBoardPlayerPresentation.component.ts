import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import PlayerColors from '../../gameLogic/enums/PlayerColors';
import FixedSizes from '../../../style/commonFixedSizes';
import Colors from '../../../style/colors';

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
  styles: [`
    .playerPresentation{
      display: flex;
      flex-direction: column;
      align-items: center;
      width: ${FixedSizes.TILE_SIZE * 3}px;
    }
    .playingPlayerHighlight {
      background: ${Colors.GRAY};
    }
    .whitePlayerName {
      color: ${Colors.WHITE};
    }
    .blackPlayerName {
      color: ${Colors.BLACK};
    }
    #pieceContainer {
      width: ${FixedSizes.TILE_SIZE}px;
      height: ${FixedSizes.TILE_SIZE}px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreBoardPlayerPresentationComponent {
  @Input() playerName: string;
  @Input() playerColor: PlayerColors;
  @Input() isPlayerTurn: boolean;

  playerColors = PlayerColors;
}
