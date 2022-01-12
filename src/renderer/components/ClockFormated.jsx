import React, { useEffect, useState, useContext } from 'react';
import { observer } from 'mobx-react';

import { formatTime } from 'renderer/utils/formatTime.jsx';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ChevronRight, ChevronLeft } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

import { StoreContext } from '../stores/store.context';

const ClockFormated = observer((props) => {
  const { timer } = useContext(StoreContext);

  useEffect(() => {
    let res = formatTime(timer.currentSeconds, timer.formatPositions);
    timer.setFormatedTime(res);
  }, [timer.currentSeconds, timer.formatPositions]);

  return (
    <>
      <Grid item xs={12} style={{ marginTop: 0 }}>
        <Grid container justifyContent="space-around" alignItems="center">
          <IconButton
            onClick={() => timer.setFormatPositions(-1)}
            disabled={timer.formatPositions === 1}
          >
            <ChevronLeft />
          </IconButton>
          <Typography style={{ fontSize: 45, color: timer.color }}>
            {timer.formatedTime}
          </Typography>
          <IconButton
            onClick={() => timer.setFormatPositions(1)}
            disabled={timer.formatPositions === 3}
          >
            <ChevronRight />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
});

export default ClockFormated;
