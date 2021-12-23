import net from 'net';
import { ipcMain } from 'electron';

export function vmixSocket(mainWindow, connection) {
  const connect = (address) => {
    const connection = net.connect(
      { port: 8099, host: address },
      () => {
        console.log('connected to server!');
      },
      () => {
        console.log('one time connection res');
        mainWindow.webContents.send('socket-connected');
      }
    );

    connection.on('data', function (data) {
      console.log(data.toString());
      console.log('---------');
    });

    connection.on('error', function (e) {
      // e.code should return ECONNREFUSED
      console.log(e.code);
      console.log('---------');
    });

    const requestXmlData = () => {
      connection.write('XML\r\n');
      // connection.connected()
      //   ? connection.send('XML')
      //   : mainWindow.webContents.send('socket-error', msg);
    };

    ipcMain.handle('vmixRequestXml', () => {
      requestXmlData();
    });
  };

  ipcMain.handle('vmixConnect', async (__, address) => {
    connect(address);
  });
}
