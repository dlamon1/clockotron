import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const ClockFormated = observer(() => {
  const [version, sVersion] = useState('0.0.0');

  const setVersion = (__, version) => {
    sVersion(version);
  };

  useEffect(() => {
    window.electron.on('version', setVersion);
  }, []);

  return (
    <Grid container justifyContent="space-around" alignItems="center">
      <Typography
        style={{
          color: 'white',
          marginTop: 15,
          fontSize: 13,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        v. {version}
      </Typography>
    </Grid>
  );
});

export default ClockFormated;
