import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { StoreContext } from '../stores/store.context';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

export const PageTab = observer(() => {
  const { clockotron } = useContext(StoreContext);

  const changeTabs = (e, value) => {
    clockotron.setTabValue(value);
  };

  return (
    <Grid
      container
      justifyContent="center"
      style={{ width: '100%', background: '' }}
    >
      <Paper style={{ background: '#333' }}>
        <Tabs
          value={clockotron.tabValue}
          onChange={changeTabs}
          aria-label="simple tabs example"
        >
          <Tab
            label="Timer"
            value={0}
            style={{ color: 'white', marginInline: 15 }}
          />
          <Tab
            label="Video"
            value={1}
            style={{ color: 'white', marginInline: 15 }}
          />
        </Tabs>
      </Paper>
    </Grid>
  );
});
