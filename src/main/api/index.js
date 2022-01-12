import { apiFunction } from './apiServer';
import { vmixSocket } from './vmixSocket';
import express from 'express';

const api = express();

export function runNetConnections(mainWindow, connection) {
  apiFunction(mainWindow, api);
  vmixSocket(mainWindow, connection);
}
