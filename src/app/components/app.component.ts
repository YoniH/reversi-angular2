import {Component} from '@angular/core';

@Component({
  selector: 'body',
  template: `
    <div class="general">
      <app-title></app-title>
      <div class="main">
        <app-instructions></app-instructions>
        <app-game></app-game>
        <app-players-form></app-players-form>
      </div>
      <app-footer></app-footer>
    </div>
  `,
  styleUrls: ['app.scss']
})
export class AppComponent {
}
