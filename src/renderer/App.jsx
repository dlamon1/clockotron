import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { StoreContext } from './stores/store.context.jsx';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';

import IpInput from './components/ip.app.jsx';
import Socket from './components/socket.app.jsx';
import Toast from './components/toast.app.jsx';
import PostThings from './components/postThing.app.jsx';
import { PageTab } from './components/tabs.compoent.jsx';
import Refresh from './components/refresh.app';

import Timer from './pages/timer.app';
import Video from './pages/video.app';

import './app.css';

const App = observer(() => {
  const { vmix, clockotron } = useContext(StoreContext);

  let areBetaFeaturesEnabled = vmix.areBetaFeaturesEnabled;
  let setAreBetaFeaturesEnabled = () => {
    clockotron.setTabValue(0);
    vmix.setAreBetaFeaturesEnabled(!areBetaFeaturesEnabled);
  };

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
              <Refresh />
              <Checkbox
                checked={areBetaFeaturesEnabled}
                onChange={() =>
                  setAreBetaFeaturesEnabled(!areBetaFeaturesEnabled)
                }
              />
              <PostThings />
              <Socket />
              <Timer />
              {areBetaFeaturesEnabled && <Video />}
            </>
          )}
        </Box>
        {/* <Test /> */}
      </Grid>
    </>
  );
});

export default App;
