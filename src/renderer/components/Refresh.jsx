import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { StoreContext } from '../stores/store.context';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const Refresh = observer(() => {
  const { vmix } = useContext(StoreContext);

  const timeout = () => {
    setTimeout(() => {
      vmix.ip && window.electron.vmix.reqXml();
      timeout();
    }, 3000);
  };

  const refresh = () => {
    vmix.refresh();
  };

  // timeout();

  return (
    <Grid
      container
      justifyContent="center"
      style={{ marginTop: 10, width: '100%' }}
    >
      <Button onClick={refresh}>Refresh Input List</Button>
    </Grid>
  );
});

export default Refresh;
