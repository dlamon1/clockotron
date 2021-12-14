// const WebSocket = require('ws');
import { Socket } from 'net';

export function socket2() {
  const Config = {
    http_port: '8080',
    socket_port: '8099',
  };

  const socket = new Socket();

  socket.connect(8099);

  // WSS server
  // const wss = new WebSocket('ws://localhost:8099');

  // wss.on('connection', () => {
  //   console.log('here');

  // ws.on('close', function close() {
  //     console.log('[SERVER]: Client disconnected.');
  // });

  // ws.on('message', function incoming(recieveData) {
  //     console.log('[SERVER] Message:', recieveData);

  // Example use
  // send(recieveData);

  //     sendAll(recieveData);
  // });

  // Send back to client
  // function send(data) {
  //     data = JSON.stringify(data);
  //     ws.send(data);
  // }

  // Send to all clients
  // function sendAll(data) {
  //     data = JSON.stringify(data);

  //     wss.clients.forEach(function each(client) {
  //         client.send(data);
  //     });
  // }
  // });
}
