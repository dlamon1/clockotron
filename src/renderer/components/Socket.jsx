import React, { useEffect, useState, useContext } from 'react';
import { observer } from 'mobx-react';
import { XMLParser } from 'fast-xml-parser';

import { StoreContext } from '../stores/store.context';
import { options } from 'renderer/utils/options.jsx';

const Socket = observer((props) => {
  const { videoReader, vmix } = useContext(StoreContext);

  let lostConnection = () => {
    vmix.lostSocketConnection();
  };

  let storeXmlDataRes = (__, xmlData) => {
    const parser = new XMLParser(options);
    let jsonObj = parser.parse(xmlData, options);
    jsonObj.vmix.inputs && vmix.setXmlRaw(xmlData);
  };

  const socketError = (__, error) => {
    connectError();
    vmix.setIp('');
    vmix.setIsSocketConnected(false);
  };

  const handleVideoData = (__, data, fullTallyDataString) => {
    // console.log(data);
    videoReader.handleNewVideoXmlData(data);
    // videoReader.handleNewTallyData(fullTallyDataString);
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
      vmix.isSocketConnect && window.electron.vmix.shutdown();
      vmix.isSocketConnect && window.electron.all();
    };
  }, []);

  // When the IP is set, make an initial request for XML data
  useEffect(() => {
    window.electron.vmix.reqXmlVideo();
    vmix.ip && window.electron.vmix.reqXmlInputList();
  }, [vmix.ip]);

  return <></>;
});

export default Socket;
