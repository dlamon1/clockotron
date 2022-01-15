import React, { useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { StoreContext } from '../stores/store.context.jsx';

import InputSelector from '../components/inputSelector.video.jsx';
import ClockFormated from '../components/clock.formated.video.jsx';

const Video = observer((props) => {
  const { videoReader } = useContext(StoreContext);

  useEffect(() => {
    console.log(videoReader.vmixInputs);
    // console.log('je;asdff');
  }, [JSON.stringify(videoReader.vmixInputs)]);

  return (
    <Grid style={{ width: '85vw' }}>
      {videoReader.vmixInputs.map(
        (input, i) =>
          input.isOnPgm &&
          input.isVideo &&
          input.isPlaying && (
            <div key={i}>
              <Typography
                align="center"
                style={{ marginTop: 15, color: 'grey', fontSize: 20 }}
              >
                {input.title}
              </Typography>
              <InputSelector i={i} />
              <ClockFormated i={i} />
            </div>
          )
      )}
    </Grid>
  );
});

export default Video;
