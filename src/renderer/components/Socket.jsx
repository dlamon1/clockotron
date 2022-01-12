import React, { useEffect, useState, useContext } from 'react';
import { observer } from 'mobx-react';
import { XMLParser } from 'fast-xml-parser';

import { useGlobalStore } from '../utils/Store.jsx';
import { options } from 'renderer/utils/options.jsx';
import { StoreContext } from '../stores/store.context.jsx';

const Socket = observer((props) => {
  const gs = useGlobalStore();
  const { value } = props;
  const { videoReader } = useContext(StoreContext);

  const connectError = () => {
    gs.setAlert('Lost connection to Vmix');
    gs.setSeverity('error');
    gs.setToastLength(5000);
    gs.setToastOpen(true);
  };

  const socketError = (__, error) => {
    connectError();
    gs.setIp('');
    gs.setIsSocketConnected(false);
  };

  let storeXmlDataRes = (__, xmlData) => {
    const parser = new XMLParser(options);
    let jsonObj = parser.parse(xmlData, options);
    jsonObj.vmix.inputs && gs.setXmlRaw(xmlData);
  };

  const handleVideoData = (__, data) => {
    videoReader.handleNewVideoData(data);
  };

  const handleTallyData = (__, data) => {
    videoReader.handleNewTallyData(data);
  };

  useEffect(() => {
    window.electron.on('xmlDataRes', storeXmlDataRes);
    window.electron.on('socket-error', socketError);
    window.electron.on('videoReaderData', handleVideoData);
    window.electron.on('videoTallyData', handleTallyData);

    return () => {
      // console.log('retured');
      gs.isSocketConnect && window.electron.vmix.shutdown();
      gs.isSocketConnect && window.electron.all();
      // gs.isSocketConnect && console.log('return shutdown');
    };
  }, []);

  useEffect(() => {
    gs.ip && window.electron.vmix.reqXmlInputList();
  }, [gs.ip]);

  return <></>;
});

export default Socket;
