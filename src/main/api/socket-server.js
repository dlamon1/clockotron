import { ConnectionTCP } from '../api/src';
import { ipcMain } from 'electron';
// import { XmlApi } from 'vmix-js-utils';

export function socket(mainWindow, connection) {
  let receivedXmlData = '';
  let reqObject = {
    Function: 'SetText',
    Input: 'MyTitle',
    SelectedName: 'TitleField',
    Value: 'Updated text!',
  };
  //
  // Switch Codes
  // 0 - Return nothing
  // 1 - Input List
  // 2 - Video Reader
  // 3 - Video Reader Loop
  let xmlReqSwitch = 0;

  async function connect(address) {
    // if (connection) {
    //   requestShutdown();
    // }
    connection && requestShutdown();

    connection = new ConnectionTCP(address, {
      debug: true,
      useDataListenersAsFallback: true,
    });

    connection.socket().on('connect', () => {
      mainWindow.webContents.send('socket-connected');

      connection.on('xml', (xmlData) => {
        // const xmlContent = XmlApi.DataParser.parse(xmlData);
        // const inputsRawData = XmlApi.Inputs.extractInputsFromXML(xmlContent);
        // const inputs = XmlApi.Inputs.map(inputsRawData);
        // console.log(xmlData);
        switch (xmlReqSwitch) {
          case 0:
            break;
          case 1:
            console.log('case 0');
            mainWindow.webContents.send('socket-xmlDataRes-inputList', xmlData);
            break;
          case 2:
            mainWindow.webContents.send(
              'socket-xmlDataRes-videoReader',
              xmlData
            );
            break;
          case 3:
            mainWindow.webContents.send(
              'socket-xmlDataRes-videoReader-loop',
              xmlData
            );
            break;
          default:
            break;
        }
      });

      connection.on('tally', (tallyData) => {
        xmlReqSwitch = 2;
        connection.send('XML');
        mainWindow.webContents.send('socket-tallyData', tallyData);
      });

      connection.on('error', (error) => {
        console.log('there was an error');
        let msg = {
          type: 'disconnected',
          err: error,
          isConnected: false,
        };
        mainWindow.webContents.send('socket-error', msg);
        connection.shutdown();
      });

      // connection.on('close', requestShutdown());

      connection.send('SUBSCRIBE TALLY');
    });
  }

  function vmixPostReq(fun, input, name, value) {
    connection.send([
      {
        Function: fun,
        Input: input,
        SelectedName: name,
        Value: value,
      },
    ]);
  }

  function requestXmlData() {
    let msg = {
      type: 'requestXmlData',
      err: 'no socket to talk to',
      isConnected: false,
    };
    connection.connected()
      ? connection.send('XML')
      : mainWindow.webContents.send('socket-error', msg);
  }

  function requestShutdown() {
    connection && connection.shutdown();
    connection && connection.clearAllListeners();
  }

  ipcMain.handle('socket-connect', async (__, address) => {
    connect(address);
  });

  ipcMain.handle('socket-postTime', async (__, input, name, value) => {
    vmixPostReq('SetText', input, name, value);
  });

  ipcMain.handle('socket-postColor', async (__, input, name, value) => {
    vmixPostReq('SetTextColour', input, name, value);
  });

  ipcMain.handle('socket-reqXml-inputList', () => {
    xmlReqSwitch = 1;
    requestXmlData();
  });

  ipcMain.handle('socket-reqXml-videoReader', () => {
    // xmlReqSwitch = 2;
    requestXmlData();
  });

  ipcMain.handle('socket-reqXml-videoReader-loop', () => {
    // xmlReqSwitch = 3;
    requestXmlData();
  });

  ipcMain.handle('socket-shutdown', () => {
    requestShutdown();
  });
}
