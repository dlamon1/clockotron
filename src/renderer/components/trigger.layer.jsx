import React, { useEffect, useState, useContext } from 'react';
import { observer } from 'mobx-react';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import { StoreContext } from '../stores/store.context';

const LayerTrigger = observer((props) => {
  let { triggerId, layerId } = props;
  const { vmix, timer } = useContext(StoreContext);
  let trigger = timer.triggers.filter((x) => x.id === triggerId)[0];
  let layer = trigger.layers.filter((x) => x.id === layerId)[0];

  const [modeSelected, setModeSelected] = useState('');
  const [inSelected, setInSelected] = useState('');
  const [layerSelected, setLayerSelected] = useState('');
  const [inputList, setInputList] = useState([]);
  const [textList, setTextList] = useState([]);
  const layerArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const modes = [
    { label: 'Toggle', command: 'MultiViewOverlay' },
    { label: 'On', command: 'MultiViewOverlayOn' },
    { label: 'Off', command: 'MultiViewOverlayOff' },
  ];

  const handleModeChange = (event) => {
    setModeSelected(event.target.value);
    const i = modes.findIndex((m) => m.label == event.target.value);
    layer.setCommand(modes[i].command);
  };

  const handleInputChange = (event) => {
    setInSelected(event.target.value);
    const i = inputList.findIndex((i) => i.title == event.target.value);
    layer.setInput(inputList[i].key);
  };

  const handleLayerChange = (event) => {
    setLayerSelected(event.target.value);
    layer.setLayer(event.target.value);
  };

  const triggerLayerUpdate = () => {
    let cmd = layer.command;
    let input = layer.input;
    let inputLayer = layer.layer;
    window.electron.vmix.vmixPostReq(
      `${cmd} Input=${input}&Value=${inputLayer}`
    );
  };

  useEffect(() => {
    if (
      (timer.isRunning &&
        timer.isCountingDown &&
        trigger.isDown &&
        layer.command &&
        timer.currentSeconds == trigger.time) ||
      (timer.isRunning &&
        !timer.isCountingDown &&
        trigger.isUp &&
        layer.command &&
        timer.currentSeconds == trigger.time)
    ) {
      triggerLayerUpdate();
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
          <Grid item xs={12} style={{ marginTop: 5 }}>
            <Grid container justifyContent="space-around" alignItems="center">
              <FormControl style={{ width: '85%' }}>
                <InputLabel>Layer</InputLabel>
                <Select
                  value={layerSelected}
                  style={{ width: '100%' }}
                  onChange={handleLayerChange}
                >
                  {layerArray.map((layer, index) => (
                    <MenuItem value={index + 1} key={index}>
                      {index + 1}
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

export default LayerTrigger;
