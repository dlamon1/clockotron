import React, { useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { StoreContext } from '../stores/store.context';

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const Test = observer(() => {
  const [value, setValue] = useState(2);
  const { videoReader } = useContext(StoreContext);
  const [list, setList] = useState([]);

  useEffect(() => {
    // console.log(videoReader.videoInputs);
  }, [JSON.stringify(videoReader.videoInputs)]);

  return (
    <>
      <Typography style={{ color: 'white' }}>hello</Typography>
      {videoReader.videoInputs.map((input) => (
        <Grid container direction="column" key={input.key}>
          <Typography style={{ color: 'white' }}>
            {input.position}
            {/* {': '}
            {input.isPlaying} */}
          </Typography>
        </Grid>
      ))}
    </>
  );
});

export default Test;
