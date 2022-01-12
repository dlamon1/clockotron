import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { StoreContext } from '../stores/store.context';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const Refresh = observer(() => {
  const { vmix } = useContext(StoreContext);

  const timeout = () => {
    setTimeout(() => {
      vmix.refresh();
      timeout();
    }, 3333);
  };

  timeout();

  return (
    <Grid container justifyContent="center" style={{ width: '100%' }}>
      <Button onClick={vmix.refresh}>Refresh Input List</Button>
    </Grid>
  );
});

export default Refresh;
