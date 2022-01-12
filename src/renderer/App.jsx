import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import IpInput from './components/IpInput.jsx';
import Socket from './components/Socket.jsx';
import Toast from './components/Toast.jsx';
import Timer from './pages/Timer';

import { StoreContext } from './stores/store.context.jsx';

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
      </Grid>
    </>
  );
});

export default App;
