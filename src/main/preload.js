const { ipcRenderer, contextBridge } = require('electron');
require('regenerator-runtime/runtime');

let messages = [];

contextBridge.exposeInMainWorld('electron', {
  vmix: {
    connect: (address) => {
      ipcRenderer.invoke('vmixConnect', address);
    },
    reqXml: () => {
      ipcRenderer.invoke('reqXml');
    },
    reqXmlToUpdateVideoPlayer: () => {
      ipcRenderer.invoke('reqXmlToUpdateVideoPlayer');
    },
    reqTally: () => {
      ipcRenderer.invoke('reqTally');
    },
    vmixPostReq: (cmd) => {
      ipcRenderer.invoke('vmixPostReq', cmd);
    },
    shutdown: () => {
      ipcRenderer.invoke('socket-shutdown');
    },
  },
  timer: {
    start: (id, currentSeconds, interval) => {
      ipcRenderer.invoke('timer-start', id, currentSeconds, interval);
    },
    stop: (id) => {
      ipcRenderer.invoke('timer-stop', id);
    },
    direction: (id, directionIsDown) => {
      ipcRenderer.invoke('timer-direction', id, directionIsDown);
    },
    upAfterDown: (id, upAfterDown) => {
      ipcRenderer.invoke('timer-upAfterDown', id, upAfterDown);
    },
  },
  store: {
    set: (key, value) => {
      ipcRenderer.invoke('store-set', key, value);
    },
    get: async (key) => {
      let res = await ipcRenderer.invoke('store-get', key);
      return res;
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
  enableBetaButton() {
    ipcRenderer.invoke('enableBetaButton');
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
  'vmixPostReq',
  'socket-xmlDataRes',
  'socket-connected',
  'xmlDataRes',
  'socket-error',
  'version',
  'playPause',
  'handleXmlData',
  'handleXmlTallyData',
  'videoTallyData',
  'inputPlayingData',
  'handleXmlActsData',
  'betaFeatures',
  'newFeaturesHaveBeenSeen',
  'timer-res',
];
