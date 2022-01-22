import React, { useState, useRef, useEffect, useContext } from 'react';
import { observer } from 'mobx-react';
import { setDriftlessTimeout, clearDriftless } from 'driftless';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { formatTime } from '../utils/formatTime';
import { StoreContext } from '../stores/store.context';

const PlayPause = observer(() => {
  const { timer, clockotron } = useContext(StoreContext);

  const [buttonState, setButtonState] = useState('Start');
  const [speed, setSpeed] = useState(100);
  const [realRemaing, setRealRemaining] = useState('');

  const directionRef = useRef(-1);

  let start = () => {
    toggle();
  };
  let stop = () => {
    toggle();
  };
  let slower = () => {
    timer.setInt(1.01);
  };
  let normal = () => {
    timer.setInt(1);
  };
  let faster = () => {
    timer.setInt(0.99);
  };
  let resetApi = () => {
    reset();
  };

  function timerDataFromMainThread(__, id, currentSeconds) {
    if (id == 'timer') {
      timer.setCurrentSeconds(currentSeconds);
    }
  }

  function toggle() {
    if (timer.currentSeconds + directionRef.current > -1) {
      timer.isRunning ? stopClock() : startClock();
    }
  }

  function reset() {
    stopClock();
    timer.setCurrentSeconds(0);
  }

  function startClock() {
    timer.startMainThreadTimer(timer.interval);
    timer.setIsRunning(true);
    setButtonState('pause');
  }

  function stopClock() {
    timer.stopMainThreadTimer();
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
    setRealRemaining(formatedTime);
  }, [timer.currentSeconds]);

  useEffect(() => {
    window.electron.on('timer-res', timerDataFromMainThread);
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
    clockotron.tabValue === 0 && (
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
    )
  );
});

export default PlayPause;
