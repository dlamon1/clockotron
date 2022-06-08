import { makeAutoObservable } from 'mobx';
import { XMLParser } from 'fast-xml-parser';
import { options } from '../utils/options';

export class Vmix {
  unconfirmedIp = '';
  ip = '1';
  xmlRaw = '';
  isSocketConnected = false;
  connectionTimeout;
  alertStore;
  inputs = [];

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

  updateInputList(data) {
    const parser = new XMLParser(options);
    let jsonObj = parser.parse(data);
    let list = jsonObj.xml.vmix.inputs.input;
    this.inputs = list;
  }

  setIsSocketConnected(boolean) {
    this.isSocketConnected = boolean;
  }

  attemptVmixConnection(ip) {
    this.unconfirmedIp = ip;
    window.electron.vmix.connect(ip);
    this.connectionTimeout = setTimeout(() => this.connectError(), 5000);
  }

  refresh() {
    this.ip && window.electron.vmix.reqXml();
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

  lostSocketConnection(__, error) {
    this.alertStore.lostVmixConnection();
    this.setIp = '';
    this.isSocketConnected = false;
  }
}
