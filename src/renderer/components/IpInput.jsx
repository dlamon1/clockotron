import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import Version from './Version.jsx';

import { useGlobalStore } from '../utils/Store.jsx';
import { useStyles } from '../utils/AppStyles.jsx';

const IpForm = observer(() => {
  const gs = useGlobalStore();
  const classes = useStyles();

  const [ip, setIpp] = useState('127.0.0.1');
  let connectionTimeout = null;

  const connectError = () => {
    gs.setAlert('Cannot connect at this address');
    gs.setSeverity('error');
    gs.setToastLength(3000);
    gs.setToastOpen(true);
  };

  const vmixConnect = () => {
    window.electron.vmix.connect(ip);
    connectionTimeout = setTimeout(connectError, 15000);
  };

  let connected = () => {
    gs.setIp(ip);
    gs.setIsSocketConnected(true);
    clearTimeout(connectionTimeout);
    gs.setAlert('Connection made to Vmix');
    gs.setSeverity('success');
    gs.setToastLength(3000);
    gs.setToastOpen(true);
  };

  const refresh = () => {
    gs.setIp('');
    gs.setIsSocketConnected(false);
    gs.setXmlRaw('');
    gs.setInput('');
    gs.setText('');
    gs.setInputVideo('');
    gs.setInputTOD('');
    gs.setTextTOD('');
  };

  useEffect(() => {
    window.electron.on('socket-connected', connected);

    return () => {
      window.electron.all();
    };
  }, []);

  return (
    <Grid item xs={12} style={{ marginTop: 0 }}>
      <Grid
        container
        justifyContent="space-around"
        alignItems="center"
        style={{}}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: '100vh' }}
        >
          <Box style={{ width: '85%', backgroundColor: '' }}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              // style={{ height: '100vh' }}
            >
              <TextField
                color="secondary"
                id="outlined-textarea"
                label="vMix IP Address"
                variant="outlined"
                margin="dense"
                value={ip}
                onChange={(e) => setIpp(e.target.value)}
                style={{ backgroundColor: '', width: '90%' }}
                focus="true"
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={vmixConnect}
                style={{ marginTop: 10, paddingLeft: 30, paddingRight: 30 }}
              >
                Set
              </Button>
              <Version />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
});

export default IpForm;
