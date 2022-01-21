import { makeAutoObservable } from 'mobx';

export class ClockotronState {
  // 0 = timer
  // 1 = video reader
  tabValue = 0;
  areBetaFeaturesEnabled = false;
  hasNewFeaturesDialogBeenSeen = false;

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

  setHasNewFeaturesDialogBeenSeen(boolean) {
    this.hasNewFeaturesDialogBeenSeen = boolean;
    window.electron.store.set('hasNewFeaturesBeenSeen', true);
  }

  storeSet(key, value) {
    window.electron.store.set(key, value);
  }
}
