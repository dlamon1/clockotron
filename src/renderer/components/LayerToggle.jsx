import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import parser from 'fast-xml-parser';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

import { useGlobalStore } from '../utils/Store.jsx';
import { options } from '../utils/options.jsx';

const LayerToggle = observer((props) => {
  let { timerIndex, colorIndex } = props;

  const gs = useGlobalStore();
  const timer = gs.timers[timerIndex];
  const color = timer.colors[colorIndex];

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
    color.setMultiviewCommand(modes[i].command);
  };

  const handleInputChange = (event) => {
    setInSelected(event.target.value);
    const i = inputList.findIndex((i) => i.attr.title == event.target.value);
    color.setInput(inputList[i].attr.key);
  };

  const handleLayerChange = (event) => {
    setLayerSelected(event.target.value);
    color.setLayer(event.target.value);
  };

  const setInputs = () => {
    let jsonObj = parser.parse(gs.xmlRaw, options);
    let list = jsonObj.vmix.inputs.input;
    setInputList(list);
  };

  const triggerLayerUpdate = () => {
    if (
      timer.currentSeconds == color.time &&
      color.doesToggle &&
      color.multiviewCommand
    ) {
      let cmd = color.multiviewCommand;
      let input = color.input;
      let layer = color.layer;
      window.electron.vmix.multiviewLayer(cmd, input, layer);
    }
  };

  useEffect(() => {
    triggerLayerUpdate();
  }, [timer.currentSeconds]);

  useEffect(() => {
    gs.xmlRaw ? setInputs() : null;
  }, [gs.xmlRaw]);

  return (
    <>
      {/* {value === 0 && ( */}
      <>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ backgroundColor: '' }}
        >
          <Checkbox
            checked={color.doesToggle}
            onChange={() => color.setDoesToggle(!color.doesToggle)}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <Typography style={{ color: 'white' }}>
            Change an Input's Layer
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ marginTop: 0 }}>
          <Grid container justifyContent="space-around" alignItems="center">
            <FormControl style={{ width: '85%' }}>
              <InputLabel id="demo-simple-select-label">Mode</InputLabel>
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
              <InputLabel id="demo-simple-select-label">Input</InputLabel>
              <Select
                value={inSelected}
                style={{ width: '100%' }}
                onChange={handleInputChange}
              >
                {inputList.map((input, index) => (
                  <MenuItem value={input.attr.title} key={index}>
                    {input.attr.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginTop: 5 }}>
          <Grid container justifyContent="space-around" alignItems="center">
            <FormControl style={{ width: '85%' }}>
              <InputLabel id="demo-simple-select-label">Layer</InputLabel>
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
      </>
    </>
  );
});

export default LayerToggle;
