import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { StoreContext } from './stores/store.context.jsx';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import IpInput from './components/ip.app.jsx';
import Socket from './components/socket.app.jsx';
import Toast from './components/toast.app.jsx';
import PostThings from './components/postThing.app.jsx';
import { PageTab } from './components/tabs.component.jsx';
import Refresh from './components/refresh.app';

import Timer from './pages/timer.app';
import Video from './pages/video.app';

import './app.css';

const App = observer(() => {
  const { vmix, clockotron } = useContext(StoreContext);

  return (
    <Grid
      id="app"
      container
      style={{
        backgroundColor: '',
        overflow: 'hidden',
        height: '100%',
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
            <Refresh />
            <PostThings />
            <Socket />
            <Timer />
            {clockotron.areBetaFeaturesEnabled && <Video />}
          </>
        )}
      </Box>
    </Grid>
  );
});

export default App;
