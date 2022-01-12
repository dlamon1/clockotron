import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react';

import TriggerDetail from './TriggerDetail';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { StoreContext } from '../stores/store.context';

const Triggers = observer((props) => {
  const { timer } = useContext(StoreContext);
  console.log(timer);

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
            triggerIndex={index}
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
