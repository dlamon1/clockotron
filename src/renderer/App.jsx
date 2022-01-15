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
import PostThings from './components/PostThings.jsx';
import { PageTab } from './components/tabs.compoent.jsx';

import Timer from './pages/Timer';
import Video from './pages/Video';

import './app.css';

const App = observer(() => {
  const { vmix } = useContext(StoreContext);
  return (
    <>
      <Grid
        id="app"
        container
        style={{
          backgroundColor: '',
          overflow: 'hidden',
          height: '100%',
          // width: '100vw',
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
              <PageTab />
              <PostThings />
              <Socket />
              <Timer />
              <Video />
            </>
          )}
        </Box>
        {/* <Test /> */}
      </Grid>
    </>
  );
});

export default App;
