import { Component, Input } from '@angular/core'
import PlayerColors from '../gameLogic/enums/PlayerColors';

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
  styleUrls: ['playerSubform.scss']
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
