'use strict';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  app,
  BrowserWindow,
  ipcMain,
  webContents,
  Menu,
  Notification,
} from 'electron';
import path from 'path';
import url from 'url';
import { updater } from './updater';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { runNetConnections } from './api';
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env);

let mainWindow;
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

// require('electron-debug')();

const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../assets');

const getAssetPath = (...paths) => {
  return path.join(RESOURCES_PATH, ...paths);
};

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 360,
    height: 950,
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
    mainWindow.webContents.send('version', app.getVersion());

    updater(isDev, mainWindow);

    mainWindow.show();
  });

  // apiFunction(mainWindow);
  // socket();
  runNetConnections(mainWindow, connection);

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// ipcMain.handle('ffmpeg', (event, file) => {
//   let res = edit(file);
//   return res;
// });

app.on('ready', () => {
  createWindow();
  const menuBuilder = new MenuBuilder(mainWindow);
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
  connection && connection.shutdown();
  connection && connection.clearAllListeners();
});
