import { makeAutoObservable } from 'mobx';

export class ClockotronState {
  // 0 = timer
  // 1 = video reader
  tabValue = 0;
  areBetaFeaturesEnabled = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAreBetaFeaturesEnabled(boolean) {
    this.areBetaFeaturesEnabled = boolean;
  }

  setTabValue(value) {
    this.tabValue = value;
  }

  enableBetaButton() {
    window.electron.enableBetaButton();
  }
}
