import React, { useEffect, useState, useContext } from 'react';
import { observer } from 'mobx-react';

import { formatTime } from 'renderer/utils/formatTime.jsx';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ChevronRight, ChevronLeft } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

import { StoreContext } from '../stores/store.context';

const ClockFormated = observer((props) => {
  const { i } = props;
  const { videoReader, clockotron } = useContext(StoreContext);
  const input = videoReader.vmixInputs[i];

  useEffect(() => {
    let res = formatTime(input.currentSeconds, input.formatPositions);
    input.setFormatedTime(res);
  }, [input.currentSeconds, input.formatPositions]);

  return (
    clockotron.tabValue === 1 && (
      <>
        <Grid item xs={12} style={{ marginTop: 20 }}>
          <Grid container justifyContent="space-around" alignItems="center">
            <IconButton
              onClick={() => input.setFormatPositions(-1)}
              disabled={input.formatPositions === 1}
            >
              <ChevronLeft />
            </IconButton>
            <Typography style={{ fontSize: 45, color: input.color }}>
              {input.formatedTime}
            </Typography>
            <IconButton
              onClick={() => input.setFormatPositions(1)}
              disabled={input.formatPositions === 3}
            >
              <ChevronRight />
            </IconButton>
          </Grid>
        </Grid>
      </>
    )
  );
});

export default ClockFormated;
