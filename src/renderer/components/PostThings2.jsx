import React, { useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react';

import { useGlobalStore } from '../utils/Store.jsx';

const PostThings = observer((props) => {
  let { value, timerIndex } = props;
  const gs = useGlobalStore();
  let timer = gs.timers[timerIndex];

  async function postTimes(time, input, text) {
    window.electron.vmix.postTime(input, text, time);
  }

  async function postColor(input, text, color) {
    let encodedColor = color.replace('#', '%23');
    window.electron.vmix.postColor(input, text, color);
  }

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
