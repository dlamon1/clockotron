import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { GithubPicker } from 'react-color';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';

import { useGlobalStore } from '../utils/Store.jsx';
import { useStyles } from '../utils/AppStyles.jsx';
import Transport from './Transport.jsx';

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

const Color2 = observer((props) => {
  let { value, timerIndex } = props;
  const gs = useGlobalStore();
  const timer = gs.timers[timerIndex];
  const classes = useStyles();

  const [fontColor, setFontColor] = useState('black');
  const [color1, setColor1] = useState('#00FF50');
  const [color2, setColor2] = useState('#FCCB00');
  const [color3, setColor3] = useState('#FF0000');
  const [color4, setColor4] = useState('#FFF');
  const [color2Time, setColor2Time] = useState(120);
  const [color3Time, setColor3Time] = useState(30);
  const [color4Time, setColor4Time] = useState(10);

  function colorize() {
    switch (true) {
      case timer.currentSeconds > color2Time:
        timer.color != color1 ? timer.setColor(color1) : null;
        break;
      case timer.currentSeconds > color3Time:
        timer.color != color2 ? timer.setColor(color2) : null;
        break;
      case timer.currentSeconds > color4Time:
        timer.color != color3 ? timer.setColor(color3) : null;
        break;
      case timer.currentSeconds >= 0:
        timer.color != color4 ? timer.setColor(color4) : null;
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    colorize();
  }, [timer.currentSeconds, color1, color2, color3, color4]);

  useEffect(() => {
    if (color1 == '#000000' || color1 == '#5300eb' || color1 == '#1b46f2') {
      setFontColor('#fff');
    } else {
      setFontColor('#000');
    }
  }, [color1]);

  return (
    <>
      <Grid item xs={12} style={{ marginTop: 20 }}>
        <Grid container justifyContent="space-around" alignItems="center">
          <Accordion style={{ backgroundColor: color1, width: '85%' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ color: fontColor }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{ backgroundColor: '' }}
            >
              <Typography style={{ color: fontColor }}>TIMER COLOR</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid item xs={12} style={{ marginTop: 20 }}>
                <Grid
                  container
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <Paper
                    style={{
                      backgroundColor: '#404040',
                      padding: 8,
                      paddingTop: 12,
                      maxWidth: '95%',
                    }}
                  >
                    <Grid container style={{ backgroundColor: '' }}>
                      <GithubPicker
                        onChangeComplete={(e) => setColor1(e.hex)}
                        colors={colors}
                        triangle="hide"
                      />
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Transport
            color={color2}
            colorFun={setColor2}
            colorTime={color2Time}
            setColorTime={setColor2Time}
          />
          <Transport
            color={color3}
            colorFun={setColor3}
            colorTime={color3Time}
            setColorTime={setColor3Time}
          />
          <Transport
            color={color4}
            colorFun={setColor4}
            colorTime={color4Time}
            setColorTime={setColor4Time}
          />
        </Grid>
      </Grid>
    </>
  );
});

export default Color2;
