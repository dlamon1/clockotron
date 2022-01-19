import React, { useEffect, useState, useContext } from 'react';
import { observer } from 'mobx-react';

import { StoreContext } from '../stores/store.context';

const Socket = observer(() => {
  const { videoReader, vmix } = useContext(StoreContext);

  const socketError = (__, error) => {
    connectError();
    vmix.setIp('');
    vmix.setIsSocketConnected(false);
  };

  const handleXmlData = (__, data) => {
    // console.log('xml ');
    videoReader.handleNewXmlData(data);
    vmix.updateInputList(data);
  };

  const handleXmlTallyData = (__, data) => {
    // console.log('xml from tally');
    videoReader.handleNewXmlData(data);
    vmix.updateInputList(data);
    videoReader.updateMountedInputIndex();
  };

  const handleXmlActsData = (__, data) => {
    // console.log('xml from tally');
    videoReader.handleNewXmlData(data);
  };

  const handleTallyData = (__, data) => {
    // console.log('tally');
    // console.log(data);
    videoReader.handleNewTallyData(data);
  };

  const handleInputPlayingData = (__, data) => {
    videoReader.updateIsPlaying(data);
  };

  useEffect(() => {
    window.electron.on('socket-error', socketError);
    window.electron.on('handleXmlData', handleXmlData);
    window.electron.on('handleXmlTallyData', handleXmlTallyData);
    window.electron.on('handleXmlActsData', handleXmlActsData);
    window.electron.on('videoTallyData', handleTallyData);
    window.electron.on('inputPlayingData', handleInputPlayingData);

    return () => {
      vmix.isSocketConnect && window.electron.vmix.shutdown();
      vmix.isSocketConnect && window.electron.all();
    };
  }, []);

  // When the IP is set, make an initial request for XML data
  useEffect(() => {
    vmix.ip && window.electron.vmix.reqTally();
  }, [vmix.ip]);

  return <></>;
});

export default Socket;
