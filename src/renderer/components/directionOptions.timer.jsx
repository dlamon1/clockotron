import React, { useState, useEffect, useRef, useContext } from 'react';
import { observer } from 'mobx-react';
import isNumeric from 'validator/lib/isNumeric';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';

import { StoreContext } from '../stores/store.context';

const DirectionOptions = observer(() => {
  const { timer, clockotron } = useContext(StoreContext);

  return (
    clockotron.tabValue === 0 && (
      <>
        <Grid item xs={12} style={{ marginTop: 0 }}>
          <Grid
            container
            justifyContent="space-around"
            alignItems="center"
            style={{}}
          >
            <Box style={{ width: '85%', backgroundColor: '' }}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{ backgroundColor: '' }}
              >
                <Typography style={{ color: 'white' }}> UP</Typography>

                <Switch
                  checked={timer.isCountingDown}
                  onChange={() =>
                    timer.setIsCountingDown(!timer.isCountingDown)
                  }
                  name="checkedA"
                />
                <Typography style={{ color: 'white' }}>DOWN</Typography>
              </Grid>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{ backgroundColor: '' }}
              >
                <Checkbox
                  checked={timer.countUpAfterDownReachesZero}
                  onChange={() =>
                    timer.setCountUpAfterDownReachesZero(
                      !timer.countUpAfterDownReachesZero
                    )
                  }
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <Typography style={{ color: 'white' }}>
                  UP AFTER DOWN
                </Typography>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </>
    )
  );
});

export default DirectionOptions;
