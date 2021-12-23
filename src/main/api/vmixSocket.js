import net from 'net';
import { ipcMain } from 'electron';

export function vmixSocket(mainWindow, connection) {
  let initListener;
  let vmixPostReqListener;
  let vmixRequestXmlListener;
  let socketShutdownListener;

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
      const dataStr = data.toString();
      handleRes(dataStr);
    });

    connection.on('error', function (e) {
      handleError(e, connection);
    });

    const requestXmlData = () => {
      connection.write('XML\r\n');
    };

    const vmixPostReq = (cmd) => {
      connection.write('FUNCTION ' + cmd + '\r\n');
    };

    vmixRequestXmlListener = () => {
      ipcMain.handle('vmixRequestXml', () => {
        requestXmlData();
      });
    };
    vmixPostReqListener = () => {
      ipcMain.handle('vmixPostReq', (__, cmd) => {
        vmixPostReq(cmd);
      });
    };
    socketShutdownListener = () => {
      ipcMain.handle('socket-shutdown', () => {
        removeIpcListeners();
        requestShutdown();
      });
    };
    vmixPostReqListener();
    vmixRequestXmlListener();
    socketShutdownListener();
  };

  const handleRes = (data) => {
    const resType = data.split(' ')[0];
    switch (resType) {
      case 'XML':
        let xml = data.split('<vmix>');
        xml = '<vmix>' + xml[1];
        mainWindow.webContents.send('xmlDataRes', xml);
        break;
      case 'FUNCTION':
      default:
        break;
    }
  };

  const handleError = (e, connection) => {
    // console.log(e);
    // console.log('----error----');
    switch (e.code) {
      case 'EPIPE':
        requestShutdown(connection);
        removeIpcListeners();
        initListener();
        mainWindow.webContents.send('socket-error', e.code);
        break;
      case 'ECONNREFUSED':
        requestShutdown(connection);
        removeIpcListeners();
        initListener();
        break;
      default:
        break;
    }
  };

  const requestShutdown = (connection) => {
    connection && connection.end();
  };

  const removeIpcListeners = () => {
    ipcMain.removeHandler('vmixConnect', initListener);
    ipcMain.removeHandler('vmixRequestXml', vmixPostReqListener);
    ipcMain.removeHandler('vmixPostReq', vmixRequestXmlListener);
    ipcMain.removeHandler('socket-shutdown', socketShutdownListener);
  };

  initListener = () => {
    ipcMain.handle('vmixConnect', async (__, address) => {
      connection = null;
      connect(address);
    });
  };

  initListener();
}
