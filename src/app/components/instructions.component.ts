import { Component, ChangeDetectionStrategy } from '@angular/core';
import Colors from '../../style/colors';
import FixedSizes from '../../style/commonFixedSizes';

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
  styles: [`
    .instructionsDiv {
      display: flex;
      flex-direction: column;
      overflow: auto;
      box-sizing: border-box;
      border: ${FixedSizes.WIDE_BORDER}px solid black;
      height: ${FixedSizes.BOARD_SIZE}px;
      background: ${Colors.DARK_GREEN};
      color: ${Colors.WHITE};
      font-size: 15px;
      line-height: 170%;
    }
    .title {
      align-self: center;
      font-weight: bold;
      text-decoration: underline;
    }
    ul {
      margin-top: 7px;
      margin-bottom: 0px;
      margin-right: 5px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstructionsComponent {
}
