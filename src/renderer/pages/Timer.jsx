import React, { useContext } from 'react';

import { observer } from 'mobx-react-lite';

import TextInputList from '../components/inputSelector.timer.jsx';
import ClockInput from '../components/ClockInput.jsx';
import TimeUp from '../components/TimeUp.jsx';
import ClockFormated from '../components/clock.formated.timer.jsx';
import TimeDown from '../components/TimeDown.jsx';
import PlayPause from '../components/PlayPause.jsx';
import DirectionOptions from '../components/DirectionOptions.jsx';
import BaseColors from '../components/BaseColors.jsx';
import Triggers from '../components/Triggers.jsx';
import PostThings from '../components/PostThings.jsx';

import { StoreContext } from '../stores/store.context';

const Timer = observer(() => {
  const { timer } = useContext(StoreContext);

  return (
    <>
      {/* <Refresh /> */}
      <TextInputList />
      <ClockInput />
      <TimeUp />
      <ClockFormated />
      <TimeDown />
      <PlayPause />
      <DirectionOptions />
      <BaseColors />
      <Triggers />
      {/* <PostThings /> */}
    </>
  );
});

export default Timer;
