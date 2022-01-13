import net from 'net';
import { ipcMain } from 'electron';
import xpath from 'xpath';
import { DOMParser } from 'xmldom';

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
    title: '',
    pgmArray: [],
  };

  let videoTypes = ['Video', 'VideoList'];

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
        // console.log('action', action);
        if (action === 'InputPlaying') {
          // console.log('          this action is preview: ', action);
          handleInputPlayingAction(data);
        }
        break;
      case 'XMLTEXT':
        break;
      case 'TALLY':
        // console.log('tally', data);
        // console.log(data);
        getPgmIndexesFromTally(data);
        // connection.write('XML\r\n');

        break;
      default:
        break;
    }
  };

  let getPgmIndexesFromTally = (tally) => {
    // console.log(tally);
    // console.log(tally);
    let aDirty = tally.split('TALLY OK ');
    let aClean = aDirty[1].split('');
    // console.log(a);
    const indexesOf = () => {
      var out = [];
      for (let i = 0; i < aClean.length; i++) {
        if ('1' == aClean[i]) {
          out.push(i + 1);
        }
      }
      return out;
    };

    mainWindow.webContents.send('videoTallyData', aClean);
    videoLapseData.pgmArray = indexesOf();
    // console.log(videoLapseData.pgmArray);
    // console.log(indexesOf('1', aClean));
  };

  //
  const handleData = (data) => {
    console.log('here');
    const dataString = data.toString();
    const resType = dataString.split(' ')[0];
    if (resType == 'XML') {
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
    if (awaitingVideoRes) {
      awaitingVideoRes = false;
      // console.log(data);
      parseVideoRes(data);
    } else {
      let xml = data.split('<vmix>');
      xml = '<vmix>' + xml[1];
      mainWindow.webContents.send('xmlDataRes', xml);
    }
  };

  const handleIndividualActsLine = (line) => {
    let actsType = line.split(' ')[0];
    if (actsType == 'ACTS') {
      handleResType_ACTS(line);
    }
    if (actsType == 'TALLY') {
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
    const fullTallyDataString = line.split(' ')[2];
    mainWindow.webContents.send('videoTallyData', fullTallyDataString);
  };

  const handleActType_INPUT_PLAYING = (data) => {
    // connection.write('TALLY\r\n');
    // [ 'InputPlaying', '4', '1' ]
    awaitingVideoRes = true;
    let isPlaying = data.split(' ')[2];
    if (isPlaying == 1) {
      videoLapseData.isPlaying = true;
    } else {
      videoLapseData.isPlaying = false;
    }
    // console.log(data.split(' '));
    videoLapseData.inputNumber = parseInt(data.split(' ')[1]);
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
    const dom = new DOMParser().parseFromString(domString);
    let num = videoLapseData.inputNumber;
    // console.log(videoLapseData);

    try {
      let key = xpath.select1(`/xml/vmix/inputs/input[${num}]/@key`, dom).value;
      let position = xpath.select1(
        `/xml/vmix/inputs/input[${num}]/@position`,
        dom
      ).value;
      let duration = xpath.select1(
        `/xml/vmix/inputs/input[${num}]/@duration`,
        dom
      ).value;
      let title = xpath.select1(
        `/xml/vmix/inputs/input[${num}]/@title`,
        dom
      ).value;
      let type = xpath.select1(
        `/xml/vmix/inputs/input[${num}]/@type`,
        dom
      ).value;

      // videoLapseData.pgm = pgm;
      videoLapseData.key = key;
      videoLapseData.duration = parseInt(duration);
      videoLapseData.position = parseInt(position);
      videoLapseData.title = title;
      videoLapseData.type = type;
      // console.log(videoLapseData);
      if (videoTypes.indexOf(type) > -1) {
        // console.log('ln 191');
        // console.log(videoLapseData);
        // mainWindow.webContents.send('videoReaderData', domString);
        // console.log('194');
      }
      mainWindow.webContents.send('videoReaderData', domString);
    } catch (error) {
      console.log(error);
    }
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
    ipcMain.removeHandler('vmixPostReq', vmixRequestXmlListener);
    ipcMain.removeHandler('socket-shutdown', socketShutdownListener);
  };

  initListener = () => {
    ipcMain.handle('vmixConnect', async (__, address) => {
      console.log(address);
      connection = null;
      connect(address);
    });
  };

  initListener();
}
