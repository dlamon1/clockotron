import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useGlobalStore } from '../utils/Store.jsx';

const PlayPause = observer((props) => {
  let { value, timerIndex } = props;
  const gs = useGlobalStore();
  const timer = gs.timers[timerIndex];

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

  useEffect(() => {
    timer.isCountingDown
      ? (directionRef.current = -1)
      : (directionRef.current = 1);
  }, [timer.isCountingDown]);

  useEffect(() => {
    let x = Math.floor((gs.timers[timerIndex].currentSeconds / speed) * 100);
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
      setRealRemaining(formatedTime);
    }
    formatTime(x);
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

  function update() {
    timer.setCurrentSeconds(timer.currentSeconds - 1);
    clockTime();
  }

  function clockTime() {
    if (timer.currentSeconds + directionRef.current > -1) {
      timer.setCurrentSeconds(timer.currentSeconds + directionRef.current);

      const startTime = document.timeline
        ? document.timeline.currentTime
        : performance.now();

      function scheduleFrame(time) {
        const elapsed = time - startTime;
        const roundedElapsed =
          Math.round(elapsed / interval.current) * interval.current;
        const targetNext = startTime + roundedElapsed + interval.current;
        const delay = (targetNext - performance.now()) * 1;
        timerRef.current = setTimeout(() => clockTime(), delay);
      }

      scheduleFrame(startTime);
    } else {
      if (timer.countUpAfterDownReachesZero) {
        directionRef.current = 1;
        timer.setIsCountingDown(false);
        clockTime();
      } else {
        timer.setIsRunning(false);
        clearTimeout(timerRef.current);
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
    clearTimeout(timerRef.current);
    timer.setIsRunning(false);
    setButtonState('start');
  }

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
