import { makeAutoObservable } from 'mobx';

export class AlertStore {
  text = '';
  severity = '';
  length = 1000;
  isOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  close() {
    this.isOpen = false;
  }

  cannotConnect() {
    this.text = 'Cannot make connection at this address';
    this.severity = 'error';
    this.length = 3000;
    this.isOpen = true;
  }

  connectionMadeToVmix() {
    this.text = 'Connection made to Vmix';
    this.severity = 'success';
    this.length = 3000;
    this.isOpen = true;
  }

  lostVmixConnection() {
    this.text = 'Lost connection to Vmix';
    this.severity = 'error';
    this.length = 5000;
    this.isOpen = true;
  }
}
