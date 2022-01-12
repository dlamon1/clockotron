import React, { useState, useRef, useEffect, useContext } from 'react';
import { observer } from 'mobx-react';
import { setDriftlessTimeout, clearDriftless } from 'driftless';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { formatTime } from '../utils/formatTime';
import { StoreContext } from '../stores/store.context';

const PlayPause = observer((props) => {
  const { timer } = useContext(StoreContext);

  const [buttonState, setButtonState] = useState('Start');
  const [speed, setSpeed] = useState(100);
  const [realRemaing, setRealRemaining] = useState('');

  const timerRef = useRef(null);
  const interval = useRef(1000);
  const directionRef = useRef(-1);

  let start = () => {
    toggle();
  };
  let stop = () => {
    toggle();
  };
  let slower = () => {
    setInt(1.01);
  };
  let normal = () => {
    setInt(1);
  };
  let faster = () => {
    setInt(0.99);
  };
  let resetApi = () => {
    reset();
  };

  function clockTime() {
    if (timer.currentSeconds + directionRef.current > -1) {
      timer.setCurrentSeconds(timer.currentSeconds + directionRef.current);

      function scheduleFrame() {
        timerRef.current = setDriftlessTimeout(
          () => clockTime(),
          interval.current
        );
      }

      scheduleFrame();
    } else {
      if (timer.countUpAfterDownReachesZero) {
        directionRef.current = 1;
        timer.setIsCountingDown(false);
        clockTime();
      } else {
        timer.setIsRunning(false);
        clearDriftless(timerRef.current);
        setButtonState('start');
      }
    }
  }

  function setInt(x) {
    if (x == 1) {
      interval.current = 1000;
      setSpeed(interval.current / 10);
    } else {
      interval.current = interval.current * x;
      setSpeed(Math.round(100000 / interval.current));
    }
  }

  function toggle() {
    if (timer.currentSeconds + directionRef.current > -1) {
      timer.isRunning ? stopClock() : startClock();
    }
  }

  function reset() {
    stopClock();
    timer.setCurrentSeconds(timer.resetSeconds);
  }

  function startClock() {
    clockTime();
    timer.setIsRunning(true);
    setButtonState('pause');
  }

  function stopClock() {
    clearDriftless(timerRef.current);
    timer.setIsRunning(false);
    setButtonState('start');
  }

  useEffect(() => {
    timer.isCountingDown
      ? (directionRef.current = -1)
      : (directionRef.current = 1);
  }, [timer.isCountingDown]);

  useEffect(() => {
    let x = Math.floor((timer.currentSeconds / speed) * 100);
    let formatedTime = formatTime(x, 3);
    // console.log(formatedTime);
    setRealRemaining(formatedTime);
  }, [timer.currentSeconds]);

  useEffect(() => {
    window.electron.on('start', start);
    window.electron.on('stop', stop);
    window.electron.on('slower', slower);
    window.electron.on('normal', normal);
    window.electron.on('faster', faster);
    window.electron.on('reset', resetApi);

    return () => {
      window.electron.all();
    };
  }, []);

  return (
    <>
      <Grid item xs={12} style={{ marginTop: 0 }}>
        <Grid container justifyContent="center" alignItems="center">
          <Button
            onClick={reset}
            size="large"
            variant="contained"
            style={{ width: '30%', marginLeft: 6, marginRight: 6 }}
          >
            Reset
          </Button>
          <Button
            onClick={toggle}
            size="large"
            variant="contained"
            style={{ width: '30%', marginLeft: 6, marginRight: 6 }}
          >
            {buttonState}
          </Button>
        </Grid>
      </Grid>

      <Grid item xs={12} style={{ marginTop: 15 }}>
        <Grid container justifyContent="center" alignItems="center">
          <Typography color="primary" style={{ fontSize: 18 }}>
            Clock Speed: {speed} %
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ marginTop: 5 }}>
        <Grid container justifyContent="center" alignItems="center">
          <Typography color="primary" style={{ fontSize: 18 }}>
            Approx Remain : {realRemaing}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ marginTop: 0 }}>
        <Grid container justifyContent="center" alignItems="center">
          <Button
            onClick={() => setInt(1.05)}
            style={{ marginLeft: 5, marginRight: 5 }}
          >
            slower
          </Button>
          <Button
            onClick={() => setInt(1)}
            style={{ marginLeft: 5, marginRight: 5 }}
          >
            normal
          </Button>
          <Button
            onClick={() => setInt(0.95)}
            style={{ marginLeft: 5, marginRight: 5 }}
          >
            faster
          </Button>
        </Grid>
      </Grid>
    </>
  );
});

export default PlayPause;
