import net from 'net';
import { ipcMain } from 'electron';

export function vmixSocket(mainWindow, connection) {
  let initListener;
  let vmixPostReqListener;
  let socketShutdownListener;
  let reqXmlListener;
  let reqTallyListener;
  let reqXmlToUpdateVideoPlayer;

  let waitingForXmlFromTallyReq = false;
  let waitingForXmlFromActsReq = false;

  // initialXmlReq is here to get the initial XML because
  // we are calling for Tally upon IP being set
  let initialXmlReq = false;

  const connect = (address) => {
    connection = net.connect(
      { port: 8099, host: address },
      () => {},
      () => {
        mainWindow.webContents.send('socket-connected');
      }
    );

    connection.on('data', function (data) {
      console.log('*****new data*****');
      splitDataResponseByNewline(data.toString());
    });

    connection.on('error', function (e) {
      handleError(e, connection);
    });

    const requestXmlData = () => {
      connection.write('XML\r\n');
    };

    const requestTallyData = () => {
      connection.write('TALLY\r\n');
    };

    const requestVideoData = () => {
      connection.write('SUBSCRIBE ACTS\r\n');
      connection.write('SUBSCRIBE TALLY\r\n');
    };

    const vmixPostReq = (cmd) => {
      connection.write('FUNCTION ' + cmd + '\r\n');
    };

    reqTallyListener = () => {
      ipcMain.handle('reqTally', () => {
        requestTallyData();
      });
    };
    reqXmlListener = () => {
      ipcMain.handle('reqXml', () => {
        requestXmlData();
      });
    };
    reqXmlToUpdateVideoPlayer = () => {
      ipcMain.handle('reqXmlToUpdateVideoPlayer', () => {
        waitingForXmlFromTallyReq = true;
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

    reqTallyListener();
    vmixPostReqListener();
    reqXmlListener();
    reqXmlToUpdateVideoPlayer();
    socketShutdownListener();
    requestVideoData();
  };

  const splitDataResponseByNewline = (data) => {
    if (data.includes('XML ')) {
      handleDataByResType(data);
      return;
    }
    let lines = createArraySplitByNewLine(data);
    lines.forEach((line) => {
      handleDataByResType(line);
    });
  };

  const handleDataByResType = (data) => {
    const resType = data.split(' ')[0];
    console.log(resType);
    if (resType == 'XML') {
      // console.log(data);
      handleActType_XML(data);
    }
    if (resType == 'ACTS') {
      // console.log(data);
      // handleIndividualActsLine(data);
      handleResType_ACTS(data);
    }
    if (resType == 'TALLY') {
      // console.log(data);
      // handleIndividualActsLine(data);
      handleResType_TALLY(data);
    }
  };

  // 1
  // 1
  // Response from XML
  const handleActType_XML = (data) => {
    let vmixNodeString = data.split('<vmix>')[1];
    if (!vmixNodeString) {
      console.error('error parsing XML data: ', data);
      return;
    }

    let vmixNodeStringClean = vmixNodeString.replace(/(\r\n|\n|\r)/gm, '');
    let domString = `<xml><vmix>${vmixNodeStringClean}</xml>`;

    if (waitingForXmlFromTallyReq && initialXmlReq) {
      mainWindow.webContents.send('handleXmlTallyData', domString);
    } else if (waitingForXmlFromActsReq && initialXmlReq) {
      mainWindow.webContents.send('handleXmlActsData', domString);
    } else {
      initialXmlReq = true;
      mainWindow.webContents.send('handleXmlData', domString);
    }
  };

  // 2
  // 2
  // Response from TALLY
  const handleResType_TALLY = (line) => {
    waitingForXmlFromTallyReq = true;
    waitingForXmlFromActsReq = false;
    let tallyString = line.split(' ')[2];
    mainWindow.webContents.send('videoTallyData', tallyString);
    connection.write('XML\r\n');
  };

  // 3
  // 3
  // Response from INPUT PLAYING
  const handleActType_INPUT_PLAYING = (data) => {
    waitingForXmlFromActsReq = true;
    waitingForXmlFromTallyReq = false;
    mainWindow.webContents.send('inputPlayingData', data);
    connection.write('XML\r\n');
  };

  const handleResType_ACTS = (line) => {
    let fullInputPlayingDataString = line.split('ACTS OK ')[1];
    let action = line.split(' ')[2];
    if (action === 'InputPlaying') {
      handleActType_INPUT_PLAYING(fullInputPlayingDataString);
    }
  };

  const createArraySplitByNewLine = (data) => {
    let arrayByLines = data.split(/\r?\n/);
    // console.log(arrayByLines);
    return arrayByLines;
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
    ipcMain.removeHandler('reqXml', reqXmlListener);
    ipcMain.removeHandler(
      'reqXmlToUpdateVideoPlayer',
      reqXmlToUpdateVideoPlayer
    );
    ipcMain.removeHandler('reqTally', reqTallyListener);
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
