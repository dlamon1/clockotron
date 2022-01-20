import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react';

import { formatTime } from 'renderer/utils/formatTime.jsx';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ChevronRight, ChevronLeft } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

import { StoreContext } from '../stores/store.context';

const ClockFormated = observer((props) => {
  const { videoReader, clockotron } = useContext(StoreContext);

  useEffect(() => {
    let res = formatTime(
      videoReader.currentSeconds,
      videoReader.formatPositions
    );
    videoReader.setFormatedTime(res);
  }, [videoReader.currentSeconds, videoReader.formatPositions]);

  return (
    clockotron.tabValue === 1 && (
      <>
        <Grid item xs={12} style={{ marginTop: 20 }}>
          <Grid container justifyContent="space-around" alignItems="center">
            <IconButton
              onClick={() => videoReader.setFormatPositions(-1)}
              disabled={videoReader.formatPositions === 1}
            >
              <ChevronLeft />
            </IconButton>
            <Typography style={{ fontSize: 45, color: videoReader.color }}>
              {videoReader.formatedTime}
            </Typography>
            <IconButton
              onClick={() => videoReader.setFormatPositions(1)}
              disabled={videoReader.formatPositions === 3}
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
