import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { GithubPicker } from 'react-color';

import TriggerDetail from './TriggerDetail';
import LayerToggle from './LayerTrigger';
import { colors } from '../utils/ColorPickerColors';
import { useGlobalStore } from '../utils/Store.jsx';
import { formatTime } from 'renderer/utils/formatTime';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const Triggers = observer((props) => {
  const { timerIndex, timerId } = props;
  const gs = useGlobalStore();
  let timer = gs.timers.filter((x) => x.id === timerId)[0];

  const updateColorWhileDecrementing = () => {
    let triggerArray = JSON.parse(JSON.stringify(timer.triggers));
    let downColorObj = { time: 10000000, color: timer.downColor };
    let filteredArray = triggerArray.filter(
      (trigger) => trigger.isDown === true
    );
    filteredArray.push(downColorObj);
    filteredArray.sort(function (a, b) {
      return a.time - b.time;
    });
    let newColor = filteredArray[0].color;
    for (let i = 0; i < filteredArray.length; i++) {
      newColor = filteredArray[i].color;
      if (timer.currentSeconds <= filteredArray[i].time) {
        break;
      }
    }
    timer.color != newColor && timer.setColor(newColor);
  };

  const updateColorWhileIncrementing = () => {
    let triggerArray = JSON.parse(JSON.stringify(timer.triggers));
    let upColorObj = { time: 10000000, color: timer.upColor };
    let filteredArray = triggerArray.filter((trigger) => trigger.isUp === true);
    filteredArray.push(upColorObj);
    filteredArray.sort(function (a, b) {
      return a.time - b.time;
    });
    let newColor = filteredArray[0].color;
    for (let i = 0; i < filteredArray.length; i++) {
      newColor = filteredArray[i].color;
      if (timer.currentSeconds <= filteredArray[i].time) {
        break;
      }
    }
    timer.color != newColor && timer.setColor(newColor);
  };

  useEffect(() => {
    timer.isCountingDown && updateColorWhileDecrementing();
    !timer.isCountingDown && updateColorWhileIncrementing();
  }, [
    timer.currentSeconds,
    timer.downColor,
    timer.upColor,
    timer.isCountingDown,
    JSON.stringify(timer.triggers),
  ]);

  return (
    <Grid item xs={12} style={{ marginTop: 10 }}>
      <Grid container justifyContent="space-around" alignItems="center">
        {timer.triggers.map((trigger, index) => (
          <TriggerDetail
            timerIndex={timerIndex}
            triggerIndex={index}
            timerId={timerId}
            triggerId={trigger.id}
            key={index}
          />
        ))}
        <Button
          variant="outlined"
          onClick={() => timer.addTrigger()}
          style={{ marginTop: 15, marginBottom: 15, paddingInline: 65 }}
        >
          Add Trigger
        </Button>
      </Grid>
    </Grid>
  );
});

export default Triggers;
