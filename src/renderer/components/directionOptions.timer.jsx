import React, { useState, useEffect, useRef, useContext } from 'react';
import { observer } from 'mobx-react';
import isNumeric from 'validator/lib/isNumeric';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';

import { StoreContext } from '../stores/store.context';

const ClockInput = observer(() => {
  const { timer, clockotron } = useContext(StoreContext);

  const [clockStartValue, setClockStartValue] = useState('');
  const [inputSeconds, setInputSeconds] = useState(0);
  const ref = useRef('');

  const formatToHoursMinutesSeconds = (input) => {
    const formated =
      (input % 100) +
      Math.floor((input / 100) % 100) * 60 +
      Math.floor(input / 10000) * 3600;
    E;
    return formated;
  };

  const apiAppendDigitToInput = (digit) => {
    ref.current = ref.current + digit;
    updateInputForm(ref.current);
  };

  const updateInputForm = (x) => {
    if (isNumeric(x)) {
      setInputSeconds(formatToHoursMinutesSeconds(x));
      setClockStartValue(x);
    }
  };

  const apiUpdateTimeSpecific = (__, valueReceived) => {
    postClockGlobally(valueReceived);
  };

  const apiPostClockReq = () => {
    postClockGlobally(formatToHoursMinutesSeconds(ref.current));
  };

  const handleKeyDown = (event) => {
    event.key === 'Enter' && postClockGlobally(inputSeconds);
  };

  const postClockGlobally = (input) => {
    timer.setCurrentSeconds(input);
    timer.setResetSeconds(input);
    setClockStartValue('');
    setInputSeconds(0);
    ref.current = '';
  };

  const apiClearInput = () => {
    ref.current = '';
    handleChange(ref.current);
    setClockStartValue('');
    setInputSeconds(0);
  };

  useEffect(() => {
    window.electron.on('0', () => {
      apiAppendDigitToInput('0');
    });
    window.electron.on('1', () => {
      apiAppendDigitToInput('1');
    });
    window.electron.on('2', () => {
      apiAppendDigitToInput('2');
    });
    window.electron.on('3', () => {
      apiAppendDigitToInput('3');
    });
    window.electron.on('4', () => {
      apiAppendDigitToInput('4');
    });
    window.electron.on('5', () => {
      apiAppendDigitToInput('5');
    });
    window.electron.on('6', () => {
      apiAppendDigitToInput('6');
    });
    window.electron.on('7', () => {
      apiAppendDigitToInput('7');
    });
    window.electron.on('8', () => {
      apiAppendDigitToInput('8');
    });
    window.electron.on('9', () => {
      apiAppendDigitToInput('9');
    });
    window.electron.on('postClock', apiPostClockReq);
    window.electron.on('clear', apiClearInput);
    window.electron.on('timeSpecific', apiUpdateTimeSpecific);

    return () => {
      window.electron.all();
    };
  }, []);

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

export default ClockInput;
