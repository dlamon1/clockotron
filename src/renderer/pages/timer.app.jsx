import React from 'react';

import { observer } from 'mobx-react-lite';

import TextInputList from '../components/inputSelector.timer.jsx';
import ClockInput from '../components/clock.input.timer.jsx';
import TimeUp from '../components/timerUp.timer.jsx';
import ClockFormated from '../components/clock.formated.timer.jsx';
import TimeDown from '../components/timerDown.timer.jsx';
import PlayPause from '../components/playPause.timer.jsx';
import DirectionOptions from '../components/directionOptions.timer.jsx';
import BaseColors from '../components/baseColors.timer.jsx';
import Triggers from '../components/trigger.parent.jsx';

const Timer = observer(() => {
  return (
    <>
      <TextInputList />
      <ClockInput />
      <TimeUp />
      <ClockFormated />
      <TimeDown />
      <PlayPause />
      <DirectionOptions />
      <BaseColors />
      <Triggers />
    </>
  );
});

export default Timer;
