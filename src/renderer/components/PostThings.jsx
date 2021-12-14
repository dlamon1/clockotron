import React, { useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react';

import { useGlobalStore } from '../utils/Store.jsx';

const PostThings = observer((props) => {
  let { value } = props;
  const gs = useGlobalStore();

  async function postTimes(time, input, text) {
    window.electron.vmix.postTime(input, text, time);
  }

  async function postColor(input, text, color) {
    let encodedColor = color.replace('#', '%23');
    window.electron.vmix.postColor(input, text, color);
  }

  useEffect(() => {
    try {
      gs.ip && gs.input && gs.text && gs.color
        ? postColor(gs.input, gs.text, gs.color)
        : null;
    } catch (err) {
      console.log(err);
    }
  }, [gs.color, gs.text]);

  useEffect(() => {
    try {
      gs.ip && gs.inputVideo && gs.textVideo && gs.colorVideo
        ? postColor(gs.inputVideo, gs.textVideo, gs.colorVideo)
        : null;
    } catch (err) {
      console.log(err);
    }
  }, [gs.colorVideo, gs.textVideo]);

  useEffect(() => {
    try {
      gs.ip && gs.inputTOD && gs.textTOD && gs.colorTOD
        ? postColor(gs.inputTOD, gs.textTOD, gs.colorTOD)
        : null;
    } catch (err) {
      console.log(err);
    }
  }, [gs.colorTOD, gs.textTOD]);

  useEffect(() => {
    try {
      gs.ip && gs.input && gs.text && gs.color
        ? postTimes(gs.formatedTime, gs.input, gs.text)
        : null;
    } catch (err) {
      console.log(err);
    }
  }, [gs.formatedTime, gs.text]);

  useEffect(() => {
    try {
      gs.ip && gs.inputVideo && gs.textVideo && gs.colorVideo
        ? postTimes(gs.formatedTimeVideo, gs.inputVideo, gs.textVideo)
        : null;
    } catch (err) {
      console.log(err);
    }
  }, [gs.formatedTimeVideo, gs.textVideo]);

  useEffect(() => {
    try {
      gs.ip && gs.inputTOD && gs.textTOD && gs.colorTOD
        ? postTimes(gs.formatedTimeTOD, gs.inputTOD, gs.textTOD)
        : null;
    } catch (err) {
      console.log(err);
    }
  }, [gs.formatedTimeTOD, gs.textTOD]);
  return <></>;
});

export default PostThings;
