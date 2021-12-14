import React, { useEffect, useState } from 'react';
import { GithubPicker } from 'react-color';

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

const Transport = (props) => {
  const { color, colorFun, colorTime, setColorTime } = props;
  const [fontColor, setFontColor] = useState('black');
  const [unit, setUnit] = useState(1);
  const [time, setTime] = useState(0);
  const [title, setTitle] = useState('00:00:00');

  const pickColor = (x) => {
    colorFun(x);
  };

  function formatTime(x) {
    // console.log(x)
    let time = [];
    time.push(Math.floor(x / 3600));
    time.push(Math.floor((x / 60) % 60));
    time.push(x % 60);
    let timePrint = add0(time[0]) + ':' + add0(time[1]) + ':' + add0(time[2]);

    function add0(x) {
      let y;
      let l = String(x).split('');
      switch (l.length) {
        case 0:
          y = '00';
          break;
        case 1:
          y = '0' + String(x);
          break;
        case 2:
          y = String(x);
          break;
        default:
          break;
      }
      return y;
    }
    setTitle(timePrint);
  }

  useEffect(() => {
    if (color == '#000000' || color == '#5300eb' || color == '#1b46f2') {
      setFontColor('#fff');
    } else {
      setFontColor('#000');
    }
  }, [color]);

  useEffect(() => {
    setColorTime(time * unit);
    formatTime(time * unit);
  }, [unit, time]);

  useEffect(() => {
    formatTime(colorTime);
    setColorTime(colorTime);
  }, []);

  return (
    <Accordion style={{ backgroundColor: color, maxWidth: '85%' }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon style={{ color: fontColor }} />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        style={{ backgroundColor: '' }}
      >
        <Typography style={{ color: fontColor }}>{title} ON CLOCK</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Paper
          style={{
            backgroundColor: '#404040',
            marginTop: -8,
            padding: 8,
            paddingTop: 12,
            maxWidth: '95%',
          }}
        >
          <Grid container style={{ backgroundColor: '' }}>
            <Grid item xs={12} style={{ marginTop: 0 }}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
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
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Unit
                  </InputLabel>
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
            <Grid item xs={12} style={{ marginTop: 10 }}>
              <Grid container justifyContent="space-around" alignItems="center">
                <GithubPicker
                  onChangeComplete={(e) => pickColor(e.hex)}
                  colors={colors}
                  triangle="hide"
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </AccordionDetails>
    </Accordion>
  );
};

export default Transport;
