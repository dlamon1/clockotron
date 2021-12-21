const { ipcRenderer, contextBridge } = require('electron');
require('regenerator-runtime/runtime');

let messages = [];

contextBridge.exposeInMainWorld('electron', {
  vmix: {
    setClockTime() {
      ipcRenderer.send('showClock');
    },
    connect: (address) => {
      ipcRenderer.invoke('socket-connect', address);
    },
    reqXmlInputList: () => {
      ipcRenderer.invoke('socket-reqXml-inputList');
    },
    reqXmlInputVideoReader: () => {
      ipcRenderer.invoke('socket-reqXml-videoReader');
    },
    reqXmlInputVideoReaderLoop: () => {
      ipcRenderer.invoke('socket-reqXml-videoReader-loop');
    },
    postTime: (input, name, value) => {
      ipcRenderer.invoke('socket-postTime', input, name, value);
    },
    postColor: (input, name, value) => {
      ipcRenderer.invoke('socket-postColor', input, name, value);
    },
    shutdown: () => {
      ipcRenderer.invoke('socket-shutdown');
    },
    multiviewLayer: (cmd, input, layer) => {
      ipcRenderer.invoke('multiviewLayer', cmd, input, layer);
    },
    playPause: (cmd, input) => {
      ipcRenderer.invoke('playPause', cmd, input);
    },
  },
  on(eventName, callback) {
    messages.indexOf(eventName) >= 0
      ? ipcRenderer.on(eventName, callback)
      : null;
  },
  off(eventName, callback) {
    messages.indexOf(eventName) >= 0
      ? ipcRenderer.removeListener(eventName, callback)
      : null;
  },
  all() {
    ipcRenderer.removeAllListeners();
  },
});

messages = [
  'start',
  'stop',
  'slower',
  'normal',
  'faster',
  'reset',
  'timeSpecific',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'postClock',
  'clear',
  'sDown',
  'mDown',
  'hDown',
  'sUp',
  'mUp',
  'hUp',
  'socket-xmlDataRes',
  'socket-connected',
  'socket-xmlDataRes-inputList',
  'socket-xmlDataRes-videoReader',
  'socket-xmlDataRes-videoReader-loop',
  'socket-tallyData',
  'socket-error',
  'version',
  'toggleMultiviewLayer',
  'playPause',
];
