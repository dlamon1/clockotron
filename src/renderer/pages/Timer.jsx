import React from 'react';
import { observer } from 'mobx-react-lite';

import TextInputList from '../components/TextInputList.jsx';
import ClockInput from '../components/ClockInput.jsx';
import ClockFormated from '../components/ClockFormated.jsx';
import TimeUp from '../components/TimeUp.jsx';
import TimeDown from '../components/TimeDown.jsx';
import PlayPause from '../components/PlayPause.jsx';
import PostThings from '../components/PostThings.jsx';
import Color from '../components/Color.jsx';
import Refresh from 'renderer/components/Refresh.jsx';
import DirectionOptions from '../components/DirectionOptions.jsx';

import Button from '@material-ui/core/Button';

import { useGlobalStore } from 'renderer/utils/Store';

const TOD = observer((props) => {
  const { value, timerIndex } = props;
  const gs = useGlobalStore();

  const toggle = () => {
    window.electron.vmix.multiviewLayerToggle(3, 1);
  };
  const on = () => {
    window.electron.vmix.multiviewLayerOn(3, 1);
  };
  const off = () => {
    window.electron.vmix.multiviewLayerOff(3, 1);
  };

  return (
    <>
      <Refresh timerIndex={timerIndex} />
      <TextInputList timerIndex={timerIndex} />
      <ClockInput timerIndex={timerIndex} />
      <TimeUp timerIndex={timerIndex} />
      <ClockFormated timerIndex={timerIndex} />
      <TimeDown timerIndex={timerIndex} />
      <PlayPause timerIndex={timerIndex} />
      <DirectionOptions timerIndex={timerIndex} />
      <Color timerIndex={timerIndex} isDown={true} />
      {/* <Color timerIndex={timerIndex} isDown={false} /> */}
      <PostThings timerIndex={timerIndex} />
    </>
  );
});

export default TOD;
