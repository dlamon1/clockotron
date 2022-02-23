import React, { useContext, useEffect, useState } from 'react';
import { GithubPicker, ChromePicker } from 'react-color';

import { observer } from 'mobx-react-lite';

import { StoreContext } from '../stores/store.context';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const Colors = observer(() => {
  const [i, setI] = useState(0);

  const pickColor = (e) => {
    let i = clockotron.indexOfColorInColors(e.hex);
    setI(i);
  };

  const updateColor = (e) => {
    clockotron.setColor(i, e.hex);
  };

  const { clockotron } = useContext(StoreContext);
  return (
    clockotron.tabValue === 2 && (
      <Grid item xs={12} style={{ marginTop: 10 }}>
        <Grid container justifyContent="center" alignItems="center">
          <Typography
            style={{ fontFamily: 'Chivo', fontSize: 16, color: 'white' }}
          >
            Color Selections
          </Typography>
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
          <ChromePicker
            onChange={(e) => updateColor(e)}
            color={clockotron.colors[i]}
          />
        </Grid>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: 10 }}
        >
          <GithubPicker
            onChangeComplete={(e) => pickColor(e)}
            colors={clockotron.colors}
            triangle="hide"
          />
        </Grid>
      </Grid>
    )
  );
});

export default Colors;
