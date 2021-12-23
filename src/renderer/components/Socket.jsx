import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import { useGlobalStore } from '../utils/Store.jsx';

const Socket = observer((props) => {
  const gs = useGlobalStore();
  const { value } = props;

  let storeXmlDataRes = (__, xmlData) => {
    gs.setXmlRaw(xmlData);
  };

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

  useEffect(() => {
    window.electron.on('xmlDataRes', storeXmlDataRes);
    window.electron.on('socket-error', socketError);

    return () => {
      gs.isSocketConnect && window.electron.vmix.shutdown();
      gs.isSocketConnect && window.electron.all();
      gs.isSocketConnect && console.log('return shutdown');
    };
  }, []);

  useEffect(() => {
    gs.ip && window.electron.vmix.reqXmlInputList();
  }, [gs.ip]);

  return <></>;
});

export default Socket;
