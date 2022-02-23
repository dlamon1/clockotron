import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { GithubPicker } from 'react-color';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import { colors } from 'renderer/utils/ColorPickerColors';

import { StoreContext } from '../stores/store.context';

const ColorTrigger = observer((props) => {
  let { triggerId, colorId } = props;
  const { timer, clockotron } = useContext(StoreContext);
  let trigger = timer.triggers.filter((x) => x.id === triggerId)[0];
  let color = trigger.colors.filter((x) => x.id === colorId)[0];

  const pickColor = (x) => {
    trigger.setColor(x);
    color.setColor(x);
  };

  return (
    <>
      <AccordionDetails>
        <Paper
          style={{
            backgroundColor: '#404040',
            marginTop: -15,
            padding: 8,
            paddingTop: 0,
            paddingBottom: 8,
            width: '95%',
          }}
        >
          <Grid item xs={12} style={{ marginTop: 10 }}>
            <Grid container justifyContent="space-around" alignItems="center">
              <GithubPicker
                onChangeComplete={(e) => pickColor(e.hex)}
                colors={clockotron.colors}
                triangle="hide"
              />
            </Grid>
          </Grid>
        </Paper>
      </AccordionDetails>
    </>
  );
});

export default ColorTrigger;
