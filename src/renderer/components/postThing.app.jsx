import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react';

import { StoreContext } from '../stores/store.context';

const PostThings = observer((props) => {
  const { vmix, timer, videoReader } = useContext(StoreContext);

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
      vmix.ip && timer.input && timer.text && timer.color
        ? postColor(timer.input, timer.text, timer.color)
        : null;
    } catch (err) {
      console.log(err);
    }
  }, [timer.color, timer.text]);

  useEffect(() => {
    try {
      vmix.ip && timer.input && timer.text && timer.color
        ? postTimes(timer.formatedTime, timer.input, timer.text)
        : null;
    } catch (err) {
      console.log(err);
    }
  }, [timer.formatedTime, timer.text]);

  useEffect(() => {
    try {
      vmix.ip && videoReader.input && videoReader.text && videoReader.color
        ? postColor(videoReader.input, videoReader.text, videoReader.color)
        : null;
    } catch (err) {
      console.log(err);
    }
  }, [videoReader.color, videoReader.text]);

  useEffect(() => {
    try {
      vmix.ip && videoReader.input && videoReader.text && videoReader.color
        ? postTimes(
            videoReader.formatedTime,
            videoReader.input,
            videoReader.text
          )
        : null;
    } catch (err) {
      console.log(err);
    }
  }, [videoReader.formatedTime, videoReader.text]);
  return <></>;
});

export default PostThings;
