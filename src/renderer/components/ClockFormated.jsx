import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useGlobalStore } from '../utils/Store.jsx';
import { formatTime } from 'renderer/utils/formatTime.jsx';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ChevronRight, ChevronLeft } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

const ClockFormated = observer((props) => {
  let { value, timerIndex } = props;

  const gs = useGlobalStore();
  const timer = gs.timers[timerIndex];

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
