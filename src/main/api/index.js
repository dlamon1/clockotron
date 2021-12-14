import { apiFunction } from './http-server';
import { socket } from './socket-server';
import express from 'express';

const api = express();

export function runNetConnections(mainWindow, connection) {
  apiFunction(mainWindow, api);
  socket(mainWindow, connection);
}
