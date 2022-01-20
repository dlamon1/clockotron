import { makeAutoObservable } from 'mobx';

export class ClockotronState {
  // 0 = timer
  // 1 = video reader
  tabValue = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setTabValue(value) {
    this.tabValue = value;
  }
}
