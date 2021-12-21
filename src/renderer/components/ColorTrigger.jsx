import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import parser from 'fast-xml-parser';
import { GithubPicker } from 'react-color';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import { useGlobalStore } from '../utils/Store.jsx';
import { options } from '../utils/options.jsx';
import { colors } from 'renderer/utils/ColorPickerColors';

const ColorTrigger = observer((props) => {
  let { timerId, triggerId, colorId } = props;

  const gs = useGlobalStore();
  let timer = gs.timers.filter((x) => x.id === timerId)[0];
  let trigger = timer.triggers.filter((x) => x.id === triggerId)[0];
  let color = trigger.colors.filter((x) => x.id === colorId)[0];

  const pickColor = (x) => {
    trigger.setColor(x);
    color.setColor(x);
  };

  const updateTimerColor = () => {
    timer.setColor(color.color);
  };

  useEffect(() => {
    timer.currentSeconds == trigger.time && updateTimerColor();
  }, [timer.currentSeconds]);

  useEffect(() => {
    // gs.xmlRaw ? setInputs() : null;
  }, [gs.xmlRaw]);

  return (
    <>
      <AccordionDetails>
        <Paper
          style={{
            backgroundColor: '#404040',
            marginTop: -15,
            padding: 8,
            paddingTop: 0,
            paddingBottom: 8,
            width: '95%',
          }}
        >
          <Grid item xs={12} style={{ marginTop: 10 }}>
            <Grid container justifyContent="space-around" alignItems="center">
              <GithubPicker
                onChangeComplete={(e) => pickColor(e.hex)}
                colors={colors}
                triangle="hide"
              />
            </Grid>
          </Grid>
        </Paper>
      </AccordionDetails>
    </>
  );
});

export default ColorTrigger;
