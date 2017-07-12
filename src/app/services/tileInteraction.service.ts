import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs/Rx';

@Injectable()
export class TileInteractionService {
  private _hovered: BehaviorSubject<{ row: number, col: number }> = new BehaviorSubject<{ row: number, col: number }>(null);
  public readonly hovered: Observable<{ row: number, col: number }> = this._hovered.asObservable();

  private _clicked: BehaviorSubject<{ row: number, col: number }> = new BehaviorSubject<{ row: number, col: number }>(null);
  public readonly clicked: Observable<{ row: number, col: number }> = this._clicked.asObservable();

  emitHoverEvent(row: number, col: number) {
    this._hovered.next({ row, col });
  }

  emitEndHoverEvent() {
    this._hovered.next(null);
  }

  emitClickEvent(row: number, col: number) {
    this._clicked.next({ row, col });
  }
}
