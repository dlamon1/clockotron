import React, { useEffect, useContext, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { setDriftlessTimeout, clearDriftless } from 'driftless';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { StoreContext } from '../stores/store.context.jsx';

import InputSelector from '../components/inputSelector.video.jsx';
import ClockFormated from '../components/clock.formated.video.jsx';

const Video = observer((props) => {
  const { videoReader } = useContext(StoreContext);

  const timerRef = useRef(null);
  const timerRef2 = useRef(null);
  const timerRef3 = useRef(null);

  const timer = () => {
    // console.log(timerRef);
    let input = videoReader.vmixInputs[videoReader.mountedInputIndex];
    window.electron.vmix.reqXmlToUpdateVideoPlayer();

    if (videoReader.currentSeconds > 0 && input.isPlaying) {
      // console.log('hello');
      videoReader.setCurrentSeconds(videoReader.currentSeconds - 1);

      function scheduleFrame() {
        timerRef.current = setDriftlessTimeout(
          () => timer(),
          videoReader.interval
        );
      }

      scheduleFrame();
    } else {
      clearDriftless(timerRef.current);
    }
  };

  // This is triggered when there is new XML data
  useEffect(() => {
    let input = videoReader.vmixInputs[videoReader.mountedInputIndex];
    // console.log(input);
    if (input) {
      // setMounted(input);
      let timeleft = input.duration - input.position;
      let rounded = Math.ceil(timeleft / 1000);
      let remainder = timeleft % 1000;
      videoReader.setCurrentSeconds(rounded);
      if (input.isPlaying && input.isVideo) {
        timerRef2.current = setDriftlessTimeout(
          videoReader.setCurrentSeconds(rounded - 1),
          remainder
        );
        timerRef3.current = setDriftlessTimeout(timer, 1000);
      } else {
        // THIS WILL NEVER HAPPEN, FIGURE OUT A WAY TO MAKE IT HAPPEN
        clearDriftless(timerRef.current);
        videoReader.setCurrentSeconds(rounded);
      }
    }
    return () => {
      clearDriftless(timerRef.current);
      clearDriftless(timerRef2.current);
      clearDriftless(timerRef3.current);
    };
  }, [videoReader.mountedInputIndex, JSON.stringify(videoReader.vmixInputs)]);

  return (
    <Grid style={{ width: '100vw' }}>
      <InputSelector />
      <ClockFormated />
      <Typography
        align="center"
        style={{ marginTop: 15, color: 'white', fontSize: 20 }}
      ></Typography>
    </Grid>
  );
});

export default Video;
