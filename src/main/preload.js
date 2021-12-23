const { ipcRenderer, contextBridge } = require('electron');
require('regenerator-runtime/runtime');

let messages = [];

contextBridge.exposeInMainWorld('electron', {
  vmix: {
    connect: (address) => {
      ipcRenderer.invoke('vmixConnect', address);
    },
    reqXmlInputList: () => {
      ipcRenderer.invoke('vmixRequestXml');
    },
    vmixPostReq: (cmd) => {
      ipcRenderer.invoke('vmixPostReq', cmd);
    },
    shutdown: () => {
      ipcRenderer.invoke('socket-shutdown');
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
  'vmixPostReq',
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
  'xmlDataRes',
  'socket-xmlDataRes-videoReader',
  'socket-xmlDataRes-videoReader-loop',
  'socket-tallyData',
  'socket-error',
  'version',
  'toggleMultiviewLayer',
  'playPause',
];
