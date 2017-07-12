import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-status-alert',
  template: `
    <div class="container">
      <p>{{text}}</p>
      <button *ngIf="confirmButtonText" (click)="confirm()">{{confirmButtonText}}</button>
    </div>
  `,
  styleUrls: ['ststusAlert.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusAlertComponent {
  @Input() text: string;
  @Input() confirmButtonText: boolean;

  @Output() onConfirmed = new EventEmitter();

  confirm() {
    this.onConfirmed.emit();
  }
}
