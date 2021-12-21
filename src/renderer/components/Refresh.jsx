import React from 'react';
import { observer } from 'mobx-react-lite';

import { useGlobalStore } from 'renderer/utils/Store';

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Refresh = observer((props) => {
  const { value, timerIndex } = props;
  const gs = useGlobalStore();

  const refresh = () => {
    window.electron.vmix.reqXmlInputList();
  };

  const timeout = () => {
    setTimeout(() => {
      refresh();
      timeout();
    }, 4000);
  };

  timeout();

  return (
    <>
      <Grid container justifyContent="center" style={{ width: '100%' }}>
        <Button onClick={refresh}>Refresh Input List</Button>
      </Grid>
    </>
  );
});

export default Refresh;
