import net from 'net';
import { ipcMain } from 'electron';
import xpath from 'xpath';
import { DOMParser } from 'xmldom';

export function vmixSocket(mainWindow, connection) {
  let initListener;
  let vmixPostReqListener;
  let vmixRequestXmlListener;
  let socketShutdownListener;
  let reqXmlVideoListener;

  let awaitingVideoRes = false;

  let videoLapseData = {
    inputNumber: 1,
    key: '',
    duration: 0,
    position: 0,
    isPlaying: false,
    title: '',
    pgmArray: [],
  };

  let ACTS_WAITING = false;

  let fullTallyDataString = '';

  const connect = (address) => {
    connection = net.connect(
      { port: 8099, host: address },
      () => {},
      () => {
        mainWindow.webContents.send('socket-connected');
      }
    );

    connection.on('data', function (data) {
      handleData(data);
    });

    connection.on('error', function (e) {
      handleError(e, connection);
    });

    const requestXmlData = () => {
      connection.write('XML\r\n');
    };

    const requestVideoData = () => {
      connection.write('SUBSCRIBE ACTS\r\n');
      connection.write('SUBSCRIBE TALLY\r\n');
    };

    const vmixPostReq = (cmd) => {
      connection.write('FUNCTION ' + cmd + '\r\n');
    };

    vmixRequestXmlListener = () => {
      ipcMain.handle('vmixRequestXml', () => {
        requestXmlData();
      });
    };
    reqXmlVideoListener = () => {
      ipcMain.handle('reqXmlVideo', () => {
        awaitingVideoRes = true;
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
    reqXmlVideoListener();
    socketShutdownListener();
    requestVideoData();
  };

  //
  const handleData = (data) => {
    console.log('**********');
    const dataString = data.toString();
    const resType = dataString.split(' ')[0];
    // console.log(resType);
    if (resType == 'XML') {
      console.log(resType);
      handleXmlData(dataString);
    }
    if (resType == 'ACTS') {
      let array = createArrayFromActsData(dataString);
      array.forEach((line) => {
        // let actsType = line.split(' ')[0];
        handleIndividualActsLine(line);
      });
    }
  };

  const handleXmlData = (data) => {
    // if (awaitingVideoRes) {
    //   awaitingVideoRes = false;
    // console.log(data);
    parseVideoRes(data);
    // } else {
    //   // parseVideoRes(data);
    //   let xml = data.split('<vmix>');
    //   xml = '<vmix>' + xml[1];
    //   mainWindow.webContents.send('xmlDataRes', xml);
    // }
  };

  const handleIndividualActsLine = (line) => {
    console.log(line);
    let actsType = line.split(' ')[0];
    if (actsType == 'ACTS') {
      // console.log('playing');
      handleResType_ACTS(line);
    }
    if (actsType == 'TALLY') {
      // console.log('tally');
      handleResType_TALLY(line);
    }
  };

  const handleResType_ACTS = (line) => {
    let fullInputPlayingDataString = line.split('ACTS OK ')[1];
    let action = line.split(' ')[2];
    if (action === 'InputPlaying') {
      handleActType_INPUT_PLAYING(fullInputPlayingDataString);
    }
  };

  const handleResType_TALLY = (line) => {
    fullTallyDataString = line.split(' ')[2];
    let tallyString = line.split(' ')[2];
    ACTS_WAITING = true;
    mainWindow.webContents.send('videoTallyData', tallyString);
    connection.write('XML\r\n');
  };

  const handleActType_INPUT_PLAYING = (data) => {
    awaitingVideoRes = true;
    ACTS_WAITING = true;
    connection.write('XML\r\n');
  };

  const createArrayFromActsData = (data) => {
    let arrayByLines = data.split(/\r?\n/);
    return arrayByLines;
  };

  const parseVideoRes = (data) => {
    // console.log(data);
    awaitingVideoRes = false;
    let vmixNodeString = data.split('<vmix>')[1];
    let vmixNodeStringClean = vmixNodeString.replace(/(\r\n|\n|\r)/gm, '');
    let domString = `<xml><vmix>${vmixNodeStringClean}</xml>`;

    mainWindow.webContents.send('videoReaderData', domString);
  };

  const handleError = (e, connection) => {
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
    ipcMain.removeHandler('reqXmlVideo', reqXmlVideoListener);
    ipcMain.removeHandler('vmixPostReq', vmixRequestXmlListener);
    ipcMain.removeHandler('socket-shutdown', socketShutdownListener);
  };

  initListener = () => {
    ipcMain.handle('vmixConnect', async (__, address) => {
      // console.log(address);
      connection = null;
      connect(address);
    });
  };

  initListener();
}
