import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Grid from '@material-ui/core/Grid';

import InputSelector from '../components/inputSelector.video.jsx';
import ClockFormated from '../components/clock.formated.video.jsx';

const Video = observer((props) => {
  const { timerIndex } = props;
  const [value, setValue] = useState(2);

  return (
    <Grid style={{ width: '85vw' }}>
      <InputSelector />
      <ClockFormated />
    </Grid>
  );
});

export default Video;
