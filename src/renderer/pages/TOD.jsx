import React from 'react';
import { observer } from 'mobx-react-lite';
import ClockFormatedTOD from '../components/ClockFormatedTOD';
import TextInputList from '../components/TextInputList';
import ColorTOD from '../components/ColorTOD';
import PostThings from '../components/PostThings2';

import { useGlobalStore } from 'renderer/utils/Store';

const TOD = observer((props) => {
  const { timerIndex } = props;
  const gs = useGlobalStore();
  let value = 2;

  return (
    <>
      <TextInputList value={value} timerIndex={timerIndex} />
      <ClockFormatedTOD value={value} timerIndex={timerIndex} />
      <ColorTOD value={value} timerIndex={timerIndex} />
      <PostThings timerIndex={timerIndex} />
    </>
  );
});

export default TOD;
