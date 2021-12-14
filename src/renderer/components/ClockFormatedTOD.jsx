import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useGlobalStore } from '../utils/Store.jsx';

const ClockFormatedTOD = observer((props) => {
  let { value, timerIndex } = props;

  const gs = useGlobalStore();

  let x;

  function formatTime() {
    let time = new Date();
    let positions = 3;
    let timeArr = [];
    timeArr.push(time.getHours());
    timeArr.push(time.getMinutes());
    timeArr.push(time.getSeconds());
    let timePrint =
      add0(timeArr[0]) + ':' + add0(timeArr[1]) + ':' + add0(timeArr[2]);

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
    gs.timers[timerIndex].setFormatedTime(timePrint);

    x = setTimeout(formatTime, 50);
  }

  useEffect(() => {
    formatTime();
    return () => {
      clearTimeout(x);
    };
  }, []);

  return (
    <>
      {' '}
      {value === 2 && (
        <Grid item xs={12} style={{ marginTop: 15 }}>
          <Grid container justifyContent="space-around" alignItems="center">
            <Typography
              style={{ fontSize: 45, color: gs.timers[timerIndex].color }}
            >
              {gs.timers[timerIndex].formatedTime}
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
});

export default ClockFormatedTOD;
