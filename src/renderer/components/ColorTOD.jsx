import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { GithubPicker } from 'react-color';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import { useGlobalStore } from '../utils/Store.jsx';
import { useStyles } from '../utils/AppStyles.jsx';
import Transport from './TriggerDetail.jsx';

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
    gs.timers[timerIndex].color != color1 &&
      gs.timers[timerIndex].setColor(color1);
  }

  useEffect(() => {
    colorize();
    // console.log(color2Time)
  }, [gs.timers[timerIndex].formatedTime, color1, color2, color3, color4]);

  useEffect(() => {
    if (color1 == '#000000' || color1 == '#5300eb' || color1 == '#1b46f2') {
      setFontColor('#fff');
    } else {
      setFontColor('#000');
    }
  }, [color1]);

  return (
    <>
      {value === 2 && (
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
                  <Typography style={{ color: fontColor }}>
                    CLOCK COLOR
                  </Typography>
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

              {/* {gs.timers.map((timer) => (
                <BoxThing timer={timer} />
              ))} */}
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
});

export default Color2;
