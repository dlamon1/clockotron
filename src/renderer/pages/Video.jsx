import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { useGlobalStore } from '../utils/Store.jsx';

import TextInputList from '../components/TextInputList.jsx';
import ClockInput from '../components/ClockInput.jsx';
import ClockFormated from '../components/ClockFormated.jsx';
import PostThings from '../components/PostThings2.jsx';
import Color from '../components/Color.jsx';
import VideoReader from '../components/VideoReader.jsx';

const Video = observer((props) => {
  const { timerIndex } = props;
  const [value, setValue] = useState(2);
  const gs = useGlobalStore();
  const timer = gs.timers[timerIndex];

  return (
    <>
      <TextInputList timerIndex={timerIndex} />
      <VideoReader timerIndex={timerIndex} />
      <ClockFormated timerIndex={timerIndex} />
      <Color timerIndex={timerIndex} />
      <PostThings timerIndex={timerIndex} />
    </>
  );
});

export default Video;
