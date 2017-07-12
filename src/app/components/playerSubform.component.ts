import { Component, Input } from '@angular/core'
import PlayerColors from '../gameLogic/enums/PlayerColors';
import FixedSizes from '../../style/commonFixedSizes';
import Colors from '../../style/colors';

@Component({
  selector: 'app-player-subform',
  template: `
    <div [ngClass]="['container', playerColor === playerColors.BLACK ? 'black' : 'white']">
      <div class="pieceContainer">
        <app-piece [pieceColor]="playerColor"></app-piece>
      </div>
      <div>
        <div>
          <input type="text" [(ngModel)]="player.name" />
        </div>
        <div class="computerPlayerDefinition">
          <div>
            <input type="checkbox" [ngModel]="player.isComputer" (change)="toggleIsComputerCheckbox()" />
            <label>Computer</label>
          </div>
          <div [ngClass]="player.isComputer ? 'visible' : 'hidden'">
            <label>Level</label>
            <input type="number" min="1" max="5" [(ngModel)]="player.computerLevel" class="levelInput" />
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      flex-direction: row;
    }
    .playerName {
      margin-bottom: 10px;
    }
    .pieceContainer {
      align-self: flex-start;
      width: ${FixedSizes.TILE_SIZE}px;
      height: ${FixedSizes.TILE_SIZE}px;
      margin: -2px 5px 5px 5px;
    }
    .computerPlayerDefinition {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 8px;
      font-size: 12px;
    }
    .levelInput {
      width: 2em;
      margin-left: 3px;
    }
    .visible {
      visibility: visible;
    }
    .hidden {
      visibility: hidden;
    }
    .black {
      color: ${Colors.BLACK};
    }
    .white {
      color: ${Colors.WHITE};
    }
  `]
})
export class PlayerSubformComponent {
  @Input() playerColor: PlayerColors;

  @Input() player: {
    name: string,
    isComputer: boolean,
    computerLevel: number
  };

  playerColors = PlayerColors;

  toggleIsComputerCheckbox() {
    this.player.isComputer = !this.player.isComputer;
  }
}
