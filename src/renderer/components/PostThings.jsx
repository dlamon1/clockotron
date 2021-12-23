import React, { useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react';

import { useGlobalStore } from '../utils/Store.jsx';

const PostThings = observer((props) => {
  let { value, timerIndex } = props;
  const gs = useGlobalStore();
  let timer = gs.timers[timerIndex];

  const postTimes = async (time, input, text) => {
    window.electron.vmix.vmixPostReq(
      `SetText Input=${input}&SelectedName=${text}&Value=${time}`
    );
  };

  const postColor = async (input, text, color) => {
    window.electron.vmix.vmixPostReq(
      `SetTextColour Input=${input}&SelectedName=${text}&Value=${color}`
    );
  };

  useEffect(() => {
    try {
      gs.ip && timer.input && timer.text && timer.color
        ? postColor(timer.input, timer.text, timer.color)
        : null;
    } catch (err) {
      console.log(err);
    }
  }, [timer.color, timer.text]);

  useEffect(() => {
    try {
      gs.ip && timer.input && timer.text && timer.color
        ? postTimes(timer.formatedTime, timer.input, timer.text)
        : null;
    } catch (err) {
      console.log(err);
    }
  }, [timer.formatedTime, timer.text]);
  return <></>;
});

export default PostThings;
