'use strict';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import path from 'path';
import { updater } from './updater';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { runNetConnections } from './api';
import dotenv from 'dotenv';
import Store from 'electron-store';
import { StoreListeners } from './storeClass';
import { Timers } from './timers';

dotenv.config();
const store = new Store();
const storeListeners = new StoreListeners(store);
storeListeners.mountListeners();

let mainWindow;
let menuBuilder;
let isDev = false;
let connection = null;
let isMac = process.platform === 'darwin';

app.commandLine.appendSwitch('disable-renderer-backgrounding');
app.commandLine.appendSwitch('ignore-certificate-errors');

if (
  process.env.NODE_ENV !== undefined &&
  process.env.NODE_ENV === 'development'
) {
  isDev = true;
}

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.platform === 'win32') {
  app.commandLine.appendSwitch('high-dpi-support', 'true');
  app.commandLine.appendSwitch('force-device-scale-factor', '1');
}

const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../assets');

const getAssetPath = (...paths) => {
  return path.join(RESOURCES_PATH, ...paths);
};

function createWindow() {
  mainWindow = new BrowserWindow({
    width: isDev ? 720 : 360,
    height: 1080,
    minWidth: 333,
    x: 0,
    y: 0,
    show: false,
    backgroundColor: '#202020',
    icon: isMac ? getAssetPath('icon.icns') : getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      pageVisibility: true,
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.once('did-finish-load', () => console.log('did finish'));

  mainWindow.once('ready-to-show', () => {
    const timers = new Timers(mainWindow);
    timers.timer.startListener();
    // timer.start();

    let hasNewFeaturesBeenSeen = store.get('hasNewFeaturesBeenSeen');
    mainWindow.webContents.send(
      'newFeaturesHaveBeenSeen',
      hasNewFeaturesBeenSeen
    );
    mainWindow.webContents.send('version', app.getVersion());

    updater(isDev, mainWindow);

    mainWindow.show();

    isDev && mainWindow.webContents.openDevTools();
  });

  runNetConnections(mainWindow, connection);

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

let betaFeaturesListener = () => {
  ipcMain.handle('enableBetaButton', (__) => {
    menuBuilder.setBetaFeaturesEnabled();
    Menu.getApplicationMenu().getMenuItemById('betaFeatures').enabled = true;
  });
};
betaFeaturesListener();

app.on('ready', () => {
  createWindow();
  menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('before-quit', () => {
  ipcMain.removeHandler('betaFeatures', betaFeaturesListener);
  storeListeners.removeListeners();
  connection && connection.destroy();
  connection && connection.clearAllListeners();
});
