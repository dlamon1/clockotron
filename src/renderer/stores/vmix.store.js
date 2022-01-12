import { makeAutoObservable } from "mobx";

export class Vmix {

  unconfirmedIp = ''
  ip = '7u'
  xmlRaw = ''
  isSocketConnected = false
  connectionTimeout
  alertStore

  constructor(alertStore) {
    this.alertStore = alertStore
    makeAutoObservable(this)
  }

  setIp(ip) {
    this.ip = ip
  }

  setXmlRaw(data) {
    this.xmlRaw = data;
  }

  setIsSocketConnected(boolean) {
    this.isSocketConnected = boolean;
  }

  attemptVmixConnection(ip) {
    this.unconfirmedIp = ip
    window.electron.vmix.connect(ip);
    this.connectionTimeout = setTimeout(() => this.connectError(), 1000);
  };

  connected() {
    this.ip(this.unconfirmedIp);
    this.setIsSocketConnected = (true);
    clearTimeout(connectionTimeout);
    this.alertStore.connectionMadeToVmix()
  };

  connectError() {
    console.log(this.alertStore);
    this.alertStore.cannotConnect();
  };

  lostSocketConnection = (__, error) => {
    this.alertStore.lostVmixConnection();
    this.setIp = '';
    this.isSocketConnected = false;
  };

  refresh() {
    this.ip && window.electron.vmix.reqXmlInputList();
  }

}
