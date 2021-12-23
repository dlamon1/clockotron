import { apiFunction } from './http-server';
import { socketOld } from './socket-server';
import { vmixSocket } from './vmixSocket';
import express from 'express';

const api = express();

export function runNetConnections(mainWindow, connection) {
  apiFunction(mainWindow, api);
  // socketOld(mainWindow, connection);
  vmixSocket(mainWindow, connection);
}
