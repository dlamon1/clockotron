import net from 'net';
import { ipcMain } from 'electron';
import xpath from 'xpath';
import { DOMParser } from 'xmldom';

console.log('***************************************************');

export function vmixSocket(mainWindow, connection) {
  let initListener;
  let vmixPostReqListener;
  let vmixRequestXmlListener;
  let socketShutdownListener;

  let awaitingVideoRes = false;

  let videoLapseData = {
    inputNumber: 1,
    key: '',
    duration: 0,
    position: 0,
    isPlaying: false,
  };

  const parseVideoRes = (data) => {
    // console.log('video res type: ', resType);
    awaitingVideoRes = false;
    let vmixNodeString = data.split('<vmix>')[1];
    // console.log(vmixNodeString);
    let vmixNodeStringClean = vmixNodeString.replace(/(\r\n|\n|\r)/gm, '');
    let domString = `<xml><vmix>${vmixNodeStringClean}</xml>`;
    const dom = new DOMParser().parseFromString(domString);
    let key = xpath.select1(`/xml/vmix/inputs/input[7]/@key`, dom).value;
    let position = xpath.select1(
      `/xml/vmix/inputs/input[7]/@position`,
      dom
    ).value;
    let duration = xpath.select1(
      `/xml/vmix/inputs/input[7]/@duration`,
      dom
    ).value;
    videoLapseData.key = key;
    videoLapseData.duration = duration;
    videoLapseData.position = position;
    console.log(videoLapseData);
    mainWindow.webContents.send('videoReaderData', videoLapseData);
  };

  const connect = (address) => {
    connection = net.connect(
      { port: 8099, host: address },
      () => {
        // console.log('connected to server!');
      },
      () => {
        // console.log('one time connection res');
        mainWindow.webContents.send('socket-connected');
      }
    );

    connection.on('data', function (data) {
      const dataString = data.toString();
      const resType = dataString.split(' ')[0];
      handleRes(resType, dataString);
    });

    connection.on('error', function (e) {
      handleError(e, connection);
    });

    const requestXmlData = () => {
      connection.write('XML\r\n');
    };

    const requestVideoData = () => {
      connection.write('SUBSCRIBE ACTS\r\n');
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
    requestVideoData();
  };

  const handleRes = (resType, data) => {
    // console.log('res type: ', resType);
    switch (resType) {
      case 'XML':
        if (awaitingVideoRes) {
          awaitingVideoRes = false;
          parseVideoRes(data);
        } else {
          let xml = data.split('<vmix>');
          xml = '<vmix>' + xml[1];
          let isBody = mainWindow.webContents.send('xmlDataRes', xml);
        }
        break;
      case 'ACTS':
        // console.log(data);
        let action = data.split(' ')[2];
        if (action === 'InputPlaying') {
          handleInputPlayingAction(data);
        }
        break;
      case 'XMLTEXT':
        break;
      default:
        break;
    }
  };

  const handleInputPlayingAction = (data) => {
    let isPlaying = data.split(' ')[4];
    if (isPlaying == 1) {
      videoLapseData.isPlaying = true;
    } else {
      videoLapseData.isPlaying = false;
    }
    videoLapseData.channel = data.split(' ')[3];
    awaitingVideoRes = true;
    connection.write('XML\r\n');
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
    connection.write('QUIT\r\n');
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
