import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private isVisibleComponent = new BehaviorSubject<boolean>(false);

  isVisible$ = this.isVisibleComponent.asObservable();

  constructor() {}

  toggleVisibility() {
    this.isVisibleComponent.next(!this.isVisibleComponent.value);
  }

  hide() {
    this.isVisibleComponent.next(false);
  }
}
