import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { GithubPicker } from 'react-color';

import { colors } from '../utils/ColorPickerColors';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';

import { useGlobalStore } from '../utils/Store.jsx';
import { useStyles } from '../utils/AppStyles.jsx';
import TriggerDetail from './TriggerDetail.jsx';

const BaseColors = observer((props) => {
  let { value, timerIndex } = props;
  const gs = useGlobalStore();
  const timer = gs.timers[timerIndex];

  // const updateColorWhileDecrementing = () => {
  //   let filteredArray = timer.colors.filter((color) => color.isDown === true);
  //   filteredArray.sort(function (a, b) {
  //     return a.time - b.time;
  //   });
  //   let newColor = '#fff';
  //   for (let i = 0; i < filteredArray.length; i++) {
  //     newColor = filteredArray[i].color;
  //     if (timer.currentSeconds <= filteredArray[i].time) {
  //       break;
  //     }
  //   }
  //   timer.color != newColor ? timer.setColor(newColor) : null;
  // };

  // const updateColorWhileIncrementing = () => {
  //   timer.color != timer.colors[1].color
  //     ? timer.setColor(timer.colors[1].color)
  //     : null;
  // };

  // useEffect(() => {
  //   timer.isCountingDown
  //     ? updateColorWhileDecrementing()
  //     : updateColorWhileIncrementing();
  // }, [
  //   timer.currentSeconds,
  //   JSON.stringify(timer.colors),
  //   timer.isCountingDown,
  // ]);

  // useEffect(() => {
  //   if (
  //     timer.colors[0].color == '#000000' ||
  //     timer.colors[0].color == '#5300eb' ||
  //     timer.colors[0].color == '#1b46f2'
  //   ) {
  //     setFontColor('#fff');
  //   } else {
  //     setFontColor('#000');
  //   }
  // }, [timer.colors[0].color]);

  // useEffect(() => {
  //   if (
  //     timer.colors[1].color == '#000000' ||
  //     timer.colors[1].color == '#5300eb' ||
  //     timer.colors[1].color == '#1b46f2'
  //   ) {
  //     setFontColorUp('#fff');
  //   } else {
  //     setFontColorUp('#000');
  //   }
  // }, [timer.colors[1].color]);

  return (
    <>
      <Grid item xs={12} style={{ marginTop: 10 }}>
        <Grid container justifyContent="space-around" alignItems="center">
          <Accordion style={{ backgroundColor: timer.downColor, width: '85%' }}>
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon style={{ color: timer.downFontColor }} />
              }
              style={{ backgroundColor: '' }}
            >
              <Typography
                style={{ color: timer.downFontColor, fontWeight: 600 }}
              >
                DOWN COLOR
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
                      backgroundColor: '#252525',
                      padding: 8,
                      paddingTop: 12,
                      maxWidth: '95%',
                    }}
                  >
                    <Grid container style={{ backgroundColor: '' }}>
                      <GithubPicker
                        onChangeComplete={(e) => timer.setDownColor(e.hex)}
                        colors={colors}
                        triangle="hide"
                      />
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ marginTop: 10 }}>
        <Grid container justifyContent="space-around" alignItems="center">
          <Accordion style={{ backgroundColor: timer.upColor, width: '85%' }}>
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon style={{ color: timer.upFontColor }} />
              }
              style={{ backgroundColor: '' }}
            >
              <Typography style={{ color: timer.upFontColor, fontWeight: 600 }}>
                UP COLOR
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
                      backgroundColor: '#252525',
                      padding: 8,
                      paddingTop: 12,
                      maxWidth: '95%',
                    }}
                  >
                    <Grid container style={{ backgroundColor: '' }}>
                      <GithubPicker
                        onChangeComplete={(e) => timer.setUpColor(e.hex)}
                        colors={colors}
                        triangle="hide"
                      />
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </>
  );
});

export default BaseColors;
