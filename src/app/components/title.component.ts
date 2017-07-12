import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-title',
  template: `
    <div id="title-row">
      <div id="title-container">
        <span id="text">REVERSI</span>
      </div>
    </div>
  `,
  styleUrls: ['title.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleComponent {
}
