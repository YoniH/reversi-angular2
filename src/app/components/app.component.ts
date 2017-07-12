import {Component} from '@angular/core';
import Colors from '../../style/colors';

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
    </div>
  `,
  styles: [`
    :host {
      background: ${Colors.LIGHT_GREEN};
    }
    .general {
      font-family: "Comic Sans MS";
      margin: 10px;
    }
    .main {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
    }
    app-instructions {
      flex: 1 1 0;
    }
    app-game {
      flex: 0 0 auto;
    }
    app-players-form {
      flex: 1 1 0;
    }
  `]
})
export class AppComponent {
}
