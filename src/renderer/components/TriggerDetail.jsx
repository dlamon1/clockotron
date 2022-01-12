import React, { useEffect, useState, useContext } from 'react';
import { observer } from 'mobx-react';

import LayerTrigger from './LayerTrigger';
import ColorTrigger from './ColorTrigger';
import PlayPauseTrigger from './PlayPauseTrigger';

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
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';

import { StoreContext } from '../stores/store.context';

const TriggerDetail = observer((props) => {
  const { timer } = useContext(StoreContext);
  const { triggerId, timerId } = props;
  let trigger = timer.triggers.filter((x) => x.id === triggerId)[0];

  const [unit, setUnit] = useState(1);
  const [backgroundColor, setBackgroundColor] = useState('#aaa');
  const [time, setTime] = useState(trigger.time);
  const [title, setTitle] = useState('00:00:00');
  const [type, setType] = useState('');

  const removeTrigger = () => {
    timer.removeTrigger(trigger.id);
  };

  const addType = (e) => {
    switch (e) {
      case 'color':
        trigger.addColor();
        break;
      case 'layer':
        trigger.addLayer();
        break;
      case 'playPause':
        trigger.addPlayPause();
        break;
    }
    setType('');
  };

  useEffect(() => {
    trigger.setFontColor();
  }, [trigger.color]);

  useEffect(() => {
    trigger.setTime(time * unit);
    let res = formatTime(time * unit, 3);
    setTitle(res);
  }, [unit, time]);

  useEffect(() => {
    let res = formatTime(trigger.time, 3);
    setTitle(res);
    addType('color');
    // color.setTime(color.time);
  }, []);

  return (
    <Accordion style={{ backgroundColor: trigger.color, width: '85%' }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon style={{ color: trigger.fontColor }} />}
        style={{ backgroundColor: '' }}
      >
        <Typography style={{ color: trigger.fontColor, fontWeight: 600 }}>
          @ {title}
        </Typography>
      </AccordionSummary>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ backgroundColor: '', marginTop: -10, marginBottom: 5 }}
      >
        <Checkbox
          checked={trigger.isUp}
          onChange={() => trigger.setIsUp(!trigger.isUp)}
          style={{ color: trigger.fontColor }}
        />
        <Typography style={{ color: trigger.fontColor, fontWeight: 600 }}>
          UP
        </Typography>
        <Checkbox
          checked={trigger.isDown}
          onChange={() => trigger.setIsDown(!trigger.isDown)}
          style={{ color: trigger.fontColor }}
        />
        <Typography style={{ color: trigger.fontColor, fontWeight: 600 }}>
          DOWN
        </Typography>
      </Grid>
      <AccordionDetails>
        <Paper
          style={{
            backgroundColor: '#404040',
            marginTop: -8,
            padding: 8,
            paddingTop: 15,
            maxWidth: '95%',
          }}
        >
          <Grid container style={{ backgroundColor: '' }}>
            <Grid item xs={12} style={{ marginTop: 0 }}>
              <Grid container justifyContent="space-around" alignItems="center">
                <TextField
                  label="Time"
                  id="filled-size-small"
                  defaultValue=""
                  variant="outlined"
                  size="small"
                  style={{ maxWidth: '45%' }}
                  onChange={(e) => setTime(e.target.value)}
                />
                <FormControl variant="outlined" size="small">
                  <InputLabel>Unit</InputLabel>
                  <Select
                    native
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    size="small"
                    label="Unit"
                  >
                    <option value={1}>Seconds</option>
                    <option value={60}>Minutes</option>
                    <option value={3600}>Hours</option>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </AccordionDetails>

      {trigger.colors.map((color, index) => (
        <ColorTrigger
          timerId={timerId}
          triggerId={triggerId}
          colorId={color.id}
          key={index}
        />
      ))}
      {trigger.layers.map((layer, index) => (
        <LayerTrigger
          timerId={timerId}
          triggerId={triggerId}
          layerId={layer.id}
          key={index}
        />
      ))}
      {trigger.playPauses.map((playPause, index) => (
        <PlayPauseTrigger
          timerId={timerId}
          triggerId={triggerId}
          playPauseId={playPause.id}
          key={index}
        />
      ))}
      <AccordionDetails>
        <Paper
          style={{
            backgroundColor: '#404040',
            marginTop: -15,
            padding: 8,
            paddingTop: 15,
            width: '95%',
          }}
        >
          <Grid container style={{ backgroundColor: '', width: '100%' }}>
            <Grid item xs={12} style={{ marginTop: 0 }}>
              <FormControl
                variant="outlined"
                size="small"
                style={{ backgroundColor: '', width: '100%', marginTop: 0 }}
              >
                <InputLabel>Add Type</InputLabel>
                <Select
                  native
                  value={type}
                  onChange={(e) => addType(e.target.value)}
                  size="small"
                  label="Unit"
                >
                  <option value={''}></option>
                  <option value={'layer'}>Toggle Multiview Layer</option>
                  <option value={'playPause'}>Play/Pause</option>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </AccordionDetails>
      <Grid container style={{ backgroundColor: '', marginTop: -15 }}>
        <Grid item xs={12} style={{ marginTop: 0 }}>
          <Grid container justifyContent="space-around" alignItems="center">
            <IconButton
              style={{ color: trigger.fontColor }}
              onClick={removeTrigger}
            >
              <DeleteForeverIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Accordion>
  );
});

export default TriggerDetail;
