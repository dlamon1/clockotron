import React, { useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { useGlobalStore } from './utils/Store.jsx';
import { StoreContext } from './stores/store.context.jsx';

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import IpForm from './components/IpInput.jsx';
import Socket from './components/Socket.jsx';
import Toast from './components/Toast.jsx';
import Version from './components/Version.jsx';

import TOD from './pages/TOD';
import Timer from './pages/Timer';
import Video from './pages/Video';

import './app.css';

const App = observer(() => {
  const [value, setValue] = useState(2);
  const gs = useGlobalStore();
  const { videoReader } = useContext(StoreContext);

  const newData = (__, data) => {
    console.log('here');
    console.log(data);
  };

  useEffect(() => {
    window.electron.on('videoReaderData', newData);
    console.log('here');

    return () => {
      window.electron.all();
      console.log('here');
    };
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [count, setCount] = useState(0);

  const addTimer = (type) => {
    setCount(count + 1);
    gs.addTimer(type);
  };

  const NewTimer = (props) => {
    const { timerIndex, timerId } = props;
    return (
      <>
        {gs.timers[timerIndex].type === 'timer' && (
          <Timer timerIndex={timerIndex} timerId={timerId} />
        )}
        {gs.timers[timerIndex].type === 'tod' && (
          <TOD timerIndex={timerIndex} />
        )}
        {gs.timers[timerIndex].type === 'video' && (
          <Video timerIndex={timerIndex} />
        )}
      </>
    );
  };

  useEffect(() => {
    addTimer('timer');
    // addTimer('tod');
  }, []);

  // const apiCall = async () => {
  //   let res = await fetch('127.0.0.1:8088/api');
  //   console.log(res);
  // };

  return (
    <>
      <Grid
        id="app"
        container
        style={{
          backgroundColor: '#202020',
          overflow: 'hidden',
          height: '100%',
          width: '100%',
          marginTop: 15,
        }}
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Box style={{ backgroundColor: '' }}>
          {/* <Button onClick={() => apiCall()}>hello</Button> */}
          <Toast />
          {!gs.ip && <IpForm />}
          {gs.ip && (
            <>
              <Socket />

              {/* <Button onClick={() => addTimer('timer')}>Add Timer</Button>
            <Button onClick={() => addTimer('video')}>Add Video</Button>
          <Button onClick={() => addTimer('tod')}>Add TOD</Button> */}

              {/* TOD */}
              {gs.timers.map((timer, index) => (
                <NewTimer timerIndex={index} key={index} timerId={timer.id} />
              ))}
            </>
          )}
        </Box>
      </Grid>
    </>
  );
});

export default App;
