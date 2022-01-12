import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react';
import parser from 'fast-xml-parser';

import { StoreContext } from '../stores/store.context';
import { options } from 'renderer/utils/options.jsx';

const Socket = observer(() => {
  const { vmix } = useContext(StoreContext);

  let storeXmlDataRes = (__, xmlData) => {
    let jsonObj = parser.parse(xmlData, options);
    jsonObj.vmix.inputs && vmix.setXmlRaw(xmlData);
  };

  let lostConnection = () => {
    vmix.lostSocketConnection();
  };

  useEffect(() => {
    window.electron.on('xmlDataRes', storeXmlDataRes);
    window.electron.on('socket-error', lostConnection);

    return () => {
      vmix.isSocketConnect && window.electron.vmix.shutdown();
      vmix.isSocketConnect && window.electron.all();
    };
  }, []);

  useEffect(() => {
    vmix.ip && window.electron.vmix.reqXmlInputList();
  }, [vmix.ip]);

  return <></>;
});

export default Socket;
