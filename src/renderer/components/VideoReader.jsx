import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { observer } from 'mobx-react';
import parser from 'fast-xml-parser';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

import { useGlobalStore } from '../utils/Store.jsx';
import { options } from '../utils/options.jsx';

const VideoReader2 = observer((props) => {
  let { timerIndex } = props;

  const gs = useGlobalStore();
  const timer = gs.timers[timerIndex];

  const [isActiveVideo, setIsActiveVideo] = useState(false);
  const [inputPlayingVideo, setInputPlayingVideo] = useState(undefined);
  const [inputList, setInputList] = useState([]);
  const [tallyData, setTallyData] = useState([]);
  const [xmlObj, setXmlObj] = useState({});
  const [xmlObjLoop, setXmlObjLoop] = useState({});
  const [isLooping, setIsLooping] = useState(false);
  let timeoutVariable;

  ///////////////////////////////////////////////////
  // When tally data is received in socket-server  //
  // it sends a request for xml data, that code is //
  // in socket-server.js                           //
  ///////////////////////////////////////////////////

  // This useEffect updates the time when xmlObjLoop data
  // is received
  useEffect(() => {
    if (isActiveVideo) {
      let endpoint;
      let duration =
        xmlObjLoop.vmix.inputs.input[inputPlayingVideo].attr.duration;
      let position =
        xmlObjLoop.vmix.inputs.input[inputPlayingVideo].attr.position;
      // console.log(duration - position);
      let markIn = xmlObjLoop.vmix.inputs.input[inputPlayingVideo].attr.markIn;
      let markOut =
        xmlObjLoop.vmix.inputs.input[inputPlayingVideo].attr.markOut;

      markOut ? (endpoint = markOut) : (endpoint = duration);
      // markIn ? (endpoint = endpoint - markIn) : (endpoint = endpoint);

      timer.setCurrentSeconds(endpoint - position);
    } else {
      timer.setCurrentSeconds(0);
    }
  }, [xmlObjLoop]);

  // This useEffect polls in a loop while there is an active video
  useEffect(() => {
    if (isLooping) {
      const loop = () => {
        if (gs.isSocketConnected) {
          window.electron.vmix.reqXmlInputVideoReaderLoop();
          timeoutVariable = setTimeout(loop, 100);
        } else {
          clearTimeout(timeoutVariable);
        }
      };
      loop();
    } else {
      clearTimeout(timeoutVariable);
    }
    return () => {
      clearTimeout(timeoutVariable);
    };
  }, [isLooping]);

  // This function checks to see if there are any active
  // videos that are playing, if so initializes the xml
  // polling
  const isVideoPlaying = () => {
    let inputs = xmlObj.vmix.inputs.input;
    let falseCount = 0;
    let inputPlaying = 0;
    inputs.forEach((input, i) => {
      if (
        (tallyData[i] === '1' && input.attr.type === 'Video') ||
        input.attr.type === 'VideoList'
      ) {
        inputPlaying = i;
      } else {
        falseCount++;
      }
    });
    if (falseCount == inputs.length) {
      setIsActiveVideo(false);
      setInputPlayingVideo(undefined);
      setIsLooping(false);
    } else {
      setIsActiveVideo(true);
      setInputPlayingVideo(inputPlaying);
      setIsLooping(true);
    }
  };

  // When tallyData or xmlObj are updated check
  // to see if there is a video currently playing
  // Needs to be useEffect bc arrives async
  useEffect(() => {
    if (tallyData.length > 0) {
      isVideoPlaying();
    }
  }, [xmlObj]);

  // Listener for xml Data that is requested upon tally
  // message received ( in socket-server ). It parses
  // and the updates state with the xml object
  useEffect(() => {
    window.electron.on('socket-xmlDataRes-videoReader', (__, xmlData) => {
      let xmlObj = parser.parse(xmlData, options);
      setXmlObj(xmlObj);
      if (gs.xmlRaw === '') {
        gs.setXmlRaw(xmlData);
      }
    });

    // Listener returns tally change and then
    // updates state with the current array
    window.electron.on('socket-tallyData', (__, tallyData) => {
      let tallyArr = tallyData.split('');
      setTallyData(tallyArr);
    });

    // Listener for looping xml Data
    window.electron.on('socket-xmlDataRes-videoReader-loop', (__, xmlData) => {
      let xmlObj = parser.parse(xmlData, options);
      setXmlObjLoop(xmlObj);
    });

    return () => {
      window.electron.all();
    };
  }, []);

  return <></>;
});

export default VideoReader2;
