import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-status-alert',
  template: `
    <div [ngClass]="{container: true, hidden: text === null }">
      <p>{{text}}</p>
      <button *ngIf="confirmButtonText" (click)="confirm()">{{confirmButtonText}}</button>
    </div>
  `,
  styleUrls: ['statusAlert.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusAlertComponent {
  @Input() text: string;
  @Input() confirmButtonText: string;

  @Output() onConfirmed = new EventEmitter();

  confirm() {
    this.onConfirmed.emit();
  }
}
