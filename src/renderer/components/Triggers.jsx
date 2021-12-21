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
  let timer = gs.timers.filter((x) => x.id === timerId);
  timer = timer[0];

  const [triggerArray, setTriggerArray] = useState([]);

  // useEffect(() => {
  //   let sortedTriggers = timer.triggers.sort(function (a, b) {
  //     return a.time - b.time;
  //   });
  //   setTriggerArray(sortedTriggers);
  // }, [JSON.stringify(timer.triggers)]);

  return (
    <Grid item xs={12} style={{ marginTop: 10 }}>
      <Grid container justifyContent="space-around" alignItems="center">
        {timer.triggers.map((trigger, index) => (
          <TriggerDetail
            timerIndex={timerIndex}
            triggerIndex={index}
            timerId={timerId}
            triggerId={trigger.id}
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
