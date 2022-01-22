import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react';

import { StoreContext } from '../stores/store.context';

const Socket = observer(() => {
  const { videoReader, vmix, clockotron } = useContext(StoreContext);

  const socketError = (__, error) => {
    connectError();
    vmix.setIp('');
    vmix.setIsSocketConnected(false);
  };

  const handleXmlData = (__, data) => {
    videoReader.handleNewXmlData(data);
    vmix.updateInputList(data);
  };

  const handleXmlTallyData = (__, data) => {
    videoReader.handleNewXmlData(data);
    vmix.updateInputList(data);
    videoReader.updateMountedInputIndex();
  };

  const handleXmlActsData = (__, data) => {
    videoReader.handleNewXmlData(data);
    videoReader.updateMountedInputIndex();
  };

  const handleTallyData = (__, data) => {
    videoReader.handleNewTallyData(data);
  };

  const handleInputPlayingData = (__, data) => {
    videoReader.updateIsPlaying(data);
  };

  const betaFeatures = (__, boolean) => {
    if (boolean) {
      clockotron.setAreBetaFeaturesEnabled(boolean);
      clockotron.setTabValue(1);
    } else {
      clockotron.setTabValue(0);
      clockotron.setAreBetaFeaturesEnabled(boolean);
    }
  };

  useEffect(() => {
    clockotron.enableBetaButton();
    window.electron.on('betaFeatures', betaFeatures);
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
