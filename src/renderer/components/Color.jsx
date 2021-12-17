import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { GithubPicker } from 'react-color';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';

import { useGlobalStore } from '../utils/Store.jsx';
import { useStyles } from '../utils/AppStyles.jsx';
import Transport from './Transport.jsx';

const colors = [
  '#FF0000',
  '#DB3E00',
  '#FCCB00',
  '#00FF50',
  '#1B46F2',
  '#5300EB',
  '#FFF',
  '#000',
];

const Color2 = observer((props) => {
  let { value, timerIndex } = props;
  const gs = useGlobalStore();
  const timer = gs.timers[timerIndex];
  const classes = useStyles();
  const [fontColor, setFontColor] = useState('black');
  const [fontColorUp, setFontColorUp] = useState('black');

  const updateColorWhileDecrementing = () => {
    let filteredArray = timer.colors.filter((color) => color.isDown === true);
    filteredArray.sort(function (a, b) {
      return a.time - b.time;
    });
    let newColor = '#fff';
    for (let i = 0; i < filteredArray.length; i++) {
      newColor = filteredArray[i].color;
      if (timer.currentSeconds < filteredArray[i].time) {
        break;
      }
    }
    timer.color != newColor ? timer.setColor(newColor) : null;
  };

  const updateColorWhileIncrementing = () => {
    timer.color != timer.colors[4].color
      ? timer.setColor(timer.colors[4].color)
      : null;
  };

  useEffect(() => {
    timer.isCountingDown
      ? updateColorWhileDecrementing()
      : updateColorWhileIncrementing();
  }, [
    timer.currentSeconds,
    JSON.stringify(timer.colors),
    timer.isCountingDown,
  ]);

  useEffect(() => {
    if (
      timer.colors[0].color == '#000000' ||
      timer.colors[0].color == '#5300eb' ||
      timer.colors[0].color == '#1b46f2'
    ) {
      setFontColor('#fff');
    } else {
      setFontColor('#000');
    }
  }, [timer.colors[0].color]);

  useEffect(() => {
    if (
      timer.colors[4].color == '#000000' ||
      timer.colors[4].color == '#5300eb' ||
      timer.colors[4].color == '#1b46f2'
    ) {
      setFontColorUp('#fff');
    } else {
      setFontColorUp('#000');
    }
  }, [timer.colors[4].color]);

  return (
    <>
      <Grid item xs={12} style={{ marginTop: 10 }}>
        <Grid container justifyContent="space-around" alignItems="center">
          <Accordion
            style={{ backgroundColor: timer.colors[0].color, width: '85%' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ color: fontColor }} />}
              style={{ backgroundColor: '' }}
            >
              <Typography style={{ color: fontColor, fontWeight: 600 }}>
                TIMER DOWN COLOR
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid item xs={12} style={{ marginTop: -10 }}>
                <Grid
                  container
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <Paper
                    style={{
                      backgroundColor: '#404040',
                      padding: 8,
                      paddingTop: 12,
                      maxWidth: '95%',
                    }}
                  >
                    <Grid container style={{ backgroundColor: '' }}>
                      <GithubPicker
                        onChangeComplete={(e) =>
                          timer.colors[0].setColor(e.hex)
                        }
                        colors={colors}
                        triangle="hide"
                      />
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Transport timerIndex={timerIndex} colorIndex={1} />
          <Transport timerIndex={timerIndex} colorIndex={2} />
          <Transport timerIndex={timerIndex} colorIndex={3} />
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ marginTop: 10 }}>
        <Grid container justifyContent="space-around" alignItems="center">
          <Accordion
            style={{ backgroundColor: timer.colors[4].color, width: '85%' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ color: fontColor }} />}
              style={{ backgroundColor: '' }}
            >
              <Typography style={{ color: fontColorUp, fontWeight: 600 }}>
                TIMER UP COLOR
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid item xs={12} style={{ marginTop: -10 }}>
                <Grid
                  container
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <Paper
                    style={{
                      backgroundColor: '#404040',
                      padding: 8,
                      paddingTop: 12,
                      maxWidth: '95%',
                    }}
                  >
                    <Grid container style={{ backgroundColor: '' }}>
                      <GithubPicker
                        onChangeComplete={(e) =>
                          timer.colors[4].setColor(e.hex)
                        }
                        colors={colors}
                        triangle="hide"
                      />
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          {/* <Transport timerIndex={timerIndex} colorIndex={5} />
          <Transport timerIndex={timerIndex} colorIndex={6} />
          <Transport timerIndex={timerIndex} colorIndex={7} /> */}
        </Grid>
      </Grid>
    </>
  );
});

export default Color2;
