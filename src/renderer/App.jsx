import React, { useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { StoreContext } from './stores/store.context.jsx';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import IpInput from './components/IpInput.jsx';
import Socket from './components/Socket.jsx';
import Toast from './components/Toast.jsx';
import Version from './components/Version.jsx';
import Test from './components/test';

import Timer from './pages/Timer';

import './app.css';

const App = observer(() => {
  const { vmix } = useContext(StoreContext);
  return (
    <>
      <Grid
        id="app"
        container
        style={{
          backgroundColor: '#202020',
          overflow: 'hidden',
          height: '100%',
          width: '100%',
          marginTop: 15,
        }}
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Box style={{ backgroundColor: '' }}>
          <Toast />
          {!vmix.ip ? (
            <IpInput />
          ) : (
            <>
              <Socket />
              <Timer />
            </>
          )}
        </Box>
        <Test />
      </Grid>
    </>
  );
});

export default App;
