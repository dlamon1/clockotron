import { makeAutoObservable } from 'mobx';

export class ClockotronState {
  // 0 = timer
  // 1 = video reader
  tabValue = 2;
  areBetaFeaturesEnabled = false;
  hasNewFeaturesDialogBeenSeen = true;
  colors = [
    '#FF0000',
    '#DB3E00',
    '#FCCB00',
    '#00FF50',
    '#1B46F2',
    '#5300EB',
    '#FFFFFF',
    '#000000',
  ];

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

  setColor(i, newHexValue) {
    this.colors[i] = newHexValue;
  }

  indexOfColorInColors(oldHexValue) {
    let i = this.colors.indexOf(oldHexValue.toUpperCase());
    return i;
  }
}
