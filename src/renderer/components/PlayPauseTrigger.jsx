import React, { useEffect, useState, useContext } from 'react';
import { observer } from 'mobx-react';
import { XMLParser } from 'fast-xml-parser';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import { options } from '../utils/options.jsx';

import { StoreContext } from '../stores/store.context';

const PlayPauseTrigger = observer((props) => {
  let { triggerId, playPauseId } = props;
  const { vmix, timer } = useContext(StoreContext);
  let trigger = timer.triggers.filter((x) => x.id === triggerId)[0];
  let playPause = trigger.playPauses.filter((x) => x.id === playPauseId)[0];

  const [modeSelected, setModeSelected] = useState('');
  const [inSelected, setInSelected] = useState('');
  const [layerSelected, setLayerSelected] = useState('');
  const [inputList, setInputList] = useState([]);
  const [textList, setTextList] = useState([]);
  const layerArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const modes = [
    { label: 'Play', command: 'Play' },
    { label: 'Pause', command: 'Pause' },
    { label: 'PlayPause', command: 'PlayPause' },
  ];

  const handleModeChange = (event) => {
    setModeSelected(event.target.value);
    const i = modes.findIndex((m) => m.label == event.target.value);
    playPause.setCommand(modes[i].command);
  };

  const handleInputChange = (event) => {
    setInSelected(event.target.value);
    const i = inputList.findIndex((i) => i.title == event.target.value);
    playPause.setInput(inputList[i].key);
  };

  const triggerPlayPause = () => {
    if (timer.currentSeconds == trigger.time && playPause.command) {
      let cmd = playPause.command;
      let input = playPause.input;
      window.electron.vmix.vmixPostReq(`${cmd} Input=${input}`);
    }
  };

  useEffect(() => {
    if (
      (timer.isRunning && timer.isCountingDown && trigger.isDown) ||
      (timer.isRunning && !timer.isCountingDown && trigger.isUp)
    ) {
      triggerPlayPause();
    }
  }, [timer.currentSeconds]);

  useEffect(() => {
    vmix.inputs && setInputList(vmix.inputs);
  }, [vmix.inputs]);

  return (
    <>
      <AccordionDetails>
        <Paper
          style={{
            backgroundColor: '#404040',
            marginTop: -15,
            padding: 8,
            paddingTop: 0,
            paddingBottom: 15,
            width: '95%',
          }}
        >
          <Grid item xs={12} style={{ marginTop: 10 }}>
            <Grid container justifyContent="space-around" alignItems="center">
              <FormControl style={{ width: '85%' }}>
                <InputLabel>Mode</InputLabel>
                <Select
                  value={modeSelected}
                  style={{ width: '100%' }}
                  onChange={handleModeChange}
                >
                  {modes.map((mode, index) => (
                    <MenuItem value={mode.label} key={index}>
                      {mode.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginTop: 5 }}>
            <Grid container justifyContent="space-around" alignItems="center">
              <FormControl style={{ width: '85%' }}>
                <InputLabel>Input</InputLabel>
                <Select
                  value={inSelected}
                  style={{ width: '100%' }}
                  onChange={handleInputChange}
                >
                  {inputList.map((input, index) => (
                    <MenuItem value={input.title} key={index}>
                      {input.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </AccordionDetails>
    </>
  );
});

export default PlayPauseTrigger;
