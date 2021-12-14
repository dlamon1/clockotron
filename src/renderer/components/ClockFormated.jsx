import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ChevronRight, ChevronLeft } from '@material-ui/icons';

import { useGlobalStore } from '../utils/Store.jsx';
import { IconButton } from '@material-ui/core';

const ClockFormated = observer((props) => {
  let { value, timerIndex } = props;

  const gs = useGlobalStore();
  const timer = gs.timers[timerIndex];

  function formatTime(x) {
    let time = [];
    time.push(Math.floor(x / 3600));
    time.push(Math.floor((x / 60) % 60));
    time.push(x % 60);
    let timePrint = add0(time[0]) + ':' + add0(time[1]) + ':' + add0(time[2]);
    let formatedTime = '';
    if (timer.formatPositions >= 3) {
      formatedTime = formatedTime + add0(time[0]) + ':';
    }
    if (timer.formatPositions >= 2) {
      formatedTime = formatedTime + add0(time[1]) + ':';
    }
    if (timer.formatPositions >= 1) {
      formatedTime = formatedTime + add0(time[2]);
    }

    function add0(x) {
      let y;
      let l = String(x).split('');
      switch (l.length) {
        case 0:
          y = '00';
          break;
        case 1:
          y = '0' + String(x);
          break;
        case 2:
          y = String(x);
          break;
        default:
          break;
      }
      return y;
    }
    timer.setFormatedTime(formatedTime);
  }

  useEffect(() => {
    formatTime(timer.currentSeconds);
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
