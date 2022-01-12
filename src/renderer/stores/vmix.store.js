import { makeAutoObservable } from 'mobx';

export class Vmix {
  unconfirmedIp = '';
  ip = '';
  xmlRaw = '';
  isSocketConnected = false;
  connectionTimeout;
  alertStore;

  constructor(alertStore) {
    this.alertStore = alertStore;
    makeAutoObservable(this);
  }

  setIp(ip) {
    this.ip = ip;
  }

  setXmlRaw(data) {
    this.xmlRaw = data;
  }

  setIsSocketConnected(boolean) {
    this.isSocketConnected = boolean;
  }

  attemptVmixConnection(ip) {
    this.unconfirmedIp = ip;
    window.electron.vmix.connect(ip);
    this.connectionTimeout = setTimeout(() => this.connectError(), 5000);
  }

  connected() {
    this.ip = this.unconfirmedIp;
    this.setIsSocketConnected = true;
    clearTimeout(this.connectionTimeout);
    this.alertStore.connectionMadeToVmix();
  }

  connectError() {
    this.alertStore.cannotConnect();
  }

  lostSocketConnection = (__, error) => {
    this.alertStore.lostVmixConnection();
    this.setIp = '';
    this.isSocketConnected = false;
  };

  refresh() {
    this.ip && window.electron.vmix.reqXmlInputList();
  }
}
