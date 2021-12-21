import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import isNumeric from 'validator/lib/isNumeric';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import { useGlobalStore } from '../utils/Store.jsx';
import { useStyles } from '../utils/AppStyles.jsx';

const ClockInput = observer((props) => {
  let { value, timerIndex } = props;

  const gs = useGlobalStore();
  const classes = useStyles();
  const timer = gs.timers[timerIndex];

  const [clockStartValue, setClockStartValue] = useState('');
  const [inputSeconds, setInputSeconds] = useState(0);
  const ref = useRef('');

  const formatToHoursMinutesSeconds = (input) => {
    const formated =
      (input % 100) +
      Math.floor((input / 100) % 100) * 60 +
      Math.floor(input / 10000) * 3600;
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
    <>
      <Grid item xs={12} style={{ marginTop: 15 }}>
        <Grid
          container
          justifyContent="space-around"
          alignItems="center"
          style={{}}
        >
          <Box style={{ width: '85%', backgroundColor: '' }}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              style={{ backgroundColor: '' }}
            >
              <TextField
                color="secondary"
                id="outlined-textarea"
                label="Enter a time"
                variant="outlined"
                margin="dense"
                value={clockStartValue}
                onChange={(e) => updateInputForm(e.target.value)}
                style={{ backgroundColor: '', width: '50%' }}
                focus="true"
                onKeyDown={handleKeyDown}
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={() => postClockGlobally(inputSeconds)}
                style={{ marginTop: 3 }}
              >
                Set time
              </Button>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
});

export default ClockInput;
