import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-instructions',
  template: `
    <div class="instructionsDiv">
      <span class="title">Instructions</span>
      <ul>
        <li>Place a piece where it would "sandwich" at least one opponent's piece.</li>
        <li>If you can't make a move, you will have to pass on your turn.</li>
        <li>When both players can't move, the game ends.</li>
        <li>The winner is the player that has the most pieces on the board when the game ends.</li>
      </ul>
    </div>
  `,
  styleUrls: ['instructions.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstructionsComponent {
}
