import { Component, ChangeDetectionStrategy } from '@angular/core';
import FixedSizes from '../../style/commonFixedSizes';

@Component({
  selector: 'app-title',
  template: `
    <div id="title-row">
      <div id="title-container">
        <span id="text">REVERSI</span>
      </div>
    </div>
  `,
  styles: [`
    #title-row {
      display: flex;
      justify-content: space-around;
    }
    #title-container {
      flex: 0 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      width: ${FixedSizes.BOARD_SIZE}px;
      height: ${FixedSizes.BOARD_SIZE / 4}px;
      background: black;
    }
    #text {
      color: white;
      font-size: ${FixedSizes.BOARD_SIZE / 4.58}px;
      font-weight: bold;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleComponent {
}
