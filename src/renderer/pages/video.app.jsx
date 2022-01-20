import React, { useEffect, useContext, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { setDriftlessTimeout, clearDriftless } from 'driftless';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { StoreContext } from '../stores/store.context.jsx';

import InputSelector from '../components/inputSelector.video.jsx';
import ClockFormated from '../components/clock.formated.video.jsx';

const Video = observer(() => {
  const { videoReader, vmix } = useContext(StoreContext);

  const timerRef = useRef(null);
  const timerRef2 = useRef(null);
  const timerRef3 = useRef(null);
  const timerRef4 = useRef(null);

  const timer = () => {
    let input = videoReader.vmixInputs[videoReader.mountedInputIndex];
    window.electron.vmix.reqXmlToUpdateVideoPlayer();

    if (videoReader.currentSeconds >= 1 && input.isPlaying) {
      timerRef4.current = setDriftlessTimeout(
        videoReader.setCurrentSeconds(videoReader.currentSeconds - 1),
        477
      );

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
    if (input) {
      let timeleft = input.duration - input.position;
      let rounded = Math.ceil(timeleft / 1000);
      let remainder = timeleft % 1000;
      videoReader.setCurrentSeconds(rounded);
      if (input.isPlaying && input.isVideo) {
        if (videoReader.currentSeconds >= 1) {
          timerRef2.current = setDriftlessTimeout(
            videoReader.setCurrentSeconds(rounded - 1),
            remainder
          );
        }
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
      clearDriftless(timerRef4.current);
    };
  }, [videoReader.mountedInputIndex, JSON.stringify(videoReader.vmixInputs)]);

  useEffect(() => {
    vmix.ip && window.electron.vmix.reqTally();
  }, [vmix.ip]);

  return (
    <Grid style={{ width: '100vw' }}>
      <InputSelector />
      <ClockFormated />
    </Grid>
  );
});

export default Video;
