import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { StoreContext } from '../stores/store.context';

export const NewFeaturesDialog = observer(() => {
  const { clockotron } = useContext(StoreContext);

  const close = () => {
    clockotron.setHasNewFeaturesDialogBeenSeen(true);
  };

  return (
    <Dialog open={!clockotron.hasNewFeaturesDialogBeenSeen} style={{}}>
      <Paper style={{ background: 'white' }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{
            padding: 15,
            background: '',
          }}
        >
          <Typography
            // noWrap
            align="center"
            style={{
              color: 'black',
              fontFamliy: 'Chivo',
              fontWeight: 700,
              fontSize: 24,
            }}
          >
            Video TRT Clock
          </Typography>
          <Typography
            // noWrap
            align="center"
            style={{
              color: 'black',
              fontFamliy: 'Chivo',
              fontWeight: 700,
            }}
          >
            Included in this release is a Video TRT Clock. It will grab the time
            data from any video that is Active/On Program, regardless of layer.
            As it has not been fully tested, this feature is disabled by
            default.
          </Typography>
          <Typography
            // noWrap
            align="center"
            style={{
              marginTop: 10,
              color: 'black',
              fontFamliy: 'Chivo',
              fontWeight: 700,
            }}
          >
            To enable it, navigate to the menu bar, click View, then click
            Toggle Video TRT.
          </Typography>
          <Button
            onClick={close}
            style={{ background: 'black', marginTop: 10 }}
          >
            Close
          </Button>
        </Grid>
      </Paper>
    </Dialog>
  );
});
