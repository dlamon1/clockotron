import { makeAutoObservable, toJS } from 'mobx';
import { XMLParser } from 'fast-xml-parser';
import { options } from '../utils/options';

let videoTypes = ['Video', 'VideoList'];

export class VideoReader {
  vmixInputs = [];
  pgmString = '';
  vmixInputsInPgm = [];
  tallyArray = [];
  inputsOnPgm = [];
  input = '';
  rawXmlInputs = [];
  text = '';
  formatPositions = 3;
  currentSeconds = 0;
  formatedTime = '00:00:00';
  color = '#00FF50';
  runClock = false;
  activeInput = 0;
  inputOnPgm;
  allActiveInputs = [];
  mountedTimer = 0;
  firstVideoOnPgm;
  mountedInputIndex;
  isMountedPlaying = false;
  interval = 1000;

  constructor() {
    makeAutoObservable(this);
  }

  setInput(input) {
    this.input = input;
  }

  setText(text) {
    this.text = text;
  }

  setFormatedTime(time) {
    this.formatedTime = time;
  }

  setFormatPositions(num) {
    if (this.formatPositions + num < 4 && this.formatPositions + num > 0) {
      this.formatPositions = this.formatPositions + num;
    }
  }

  // create array of each channel
  // create array of each channel in pgm
  handleNewTallyData(data) {
    this.tallyArray = data.split('');
    this.updateInputsOnPgm();
  }

  updateInputsOnPgm() {
    let a = [];
    this.tallyArray.forEach((input, index) => {
      if (input == '1') {
        a.push(parseInt(index));
      }
    });
    this.inputsOnPgm = a;
  }

  handleNewXmlData(data) {
    let jsonObj = this.parseXmlToJSON(data);
    this.rawXmlInputs = jsonObj.xml.vmix.inputs.input;
    this.activeInput = jsonObj.xml.vmix.active;

    this.rawXmlInputs.forEach((input) => {
      let index = this.checkForInput(input.key);
      if (index == -1) {
        this.addInput(input);
      } else {
        let tallyArrayObj = toJS(this.tallyArray);
        this.updateInputXmlData(index, input, tallyArrayObj);
      }
    });
    return;
  }

  // has input changed
  // is input video
  updateMountedInputIndex() {
    let pgm = { isVideo: false, inputIndex: 0, isPlaying: false };
    this.inputsOnPgm.every((input) => {
      let isVideo = this.checkTypeIsVideo(this.vmixInputs[input].type);
      if (isVideo) {
        pgm.isVideo = true;
        pgm.inputIndex = input;
        return false;
      }
      return true;
    });
    if (!pgm.isVideo) {
      pgm.inputIndex = this.inputsOnPgm[0];
    }
    pgm.key = this.vmixInputs[pgm.inputIndex].key;
    let mountedKey;
    if (this.vmixInputs[this.mountedInputIndex]) {
      mountedKey = this.vmixInputs[this.mountedInputIndex].key;
    }
    if (mountedKey != pgm.key) {
      this.interval = 1000;
      this.mountedInputIndex = pgm.inputIndex;
    } else {
      this.updateInterval(pgm);
    }
  }

  updateIsPlaying(data) {
    let inputIndex = parseInt(data.split(' ')[1]) - 1;
    let inputPlayingStatus = data.split(' ')[2];
    let isPlaying = false;
    if (inputPlayingStatus == '1') {
      isPlaying = true;
    }
    if (inputIndex == this.mountedInputIndex) {
      this.isMountedPlaying = isPlaying;
    }
  }

  updateInterval(pgm) {
    let input = this.vmixInputs[pgm.inputIndex];
    let newInterval = (input.duration - input.position) / this.currentSeconds;
    this.interval = newInterval;
  }

  checkTypeIsVideo(type) {
    let i = videoTypes.indexOf(type);
    if (i > -1) {
      return true;
    } else {
      return false;
    }
  }

  setCurrentSeconds(time) {
    if (typeof time === 'number') this.currentSeconds = time;
  }

  parseXmlToJSON(data) {
    const parser = new XMLParser(options);
    let jsonObj = parser.parse(data);
    return jsonObj;
  }

  checkForInput(key) {
    let res = this.vmixInputs.findIndex((input) => input.key == key);
    return res;
  }

  addInput(inputObj) {
    let input = new Input(inputObj);
    this.vmixInputs.push(input);
  }

  updateInputXmlData(index, data, tally) {
    this.vmixInputs[index].update(data, tally);
  }
}

class Input {
  inputNumber = 1;
  key = '';
  duration = 0;
  position = 0;
  isPlaying = false;
  title = '';
  isCountingDown = false;
  isOnPgm = false;
  type = '';
  isVideo = false;

  constructor(input) {
    makeAutoObservable(this);
    this.inputNumber = parseInt(input.number);
    this.key = input.key;
    this.isPlaying = this.setIsPlaying(input);
    this.title = input.title;
    this.type = input.type;
    this.setIsVideo(input.type);
  }

  setIsVideo(type) {
    let i = videoTypes.indexOf(type);
    if (i > -1) {
      this.isVideo = true;
    } else {
      this.isVideo = false;
    }
  }

  setInput(input) {
    this.input = input;
  }

  setText(text) {
    this.text = text;
  }

  setFormatedTime(time) {
    this.formatedTime = time;
  }

  setIsPlaying(input) {
    if (input.state === 'Running') {
      return true;
    } else {
      return false;
    }
  }

  setDuration(input) {
    if (input.duration) {
      let dur = parseInt(input.duration);
      return dur;
    }
    return 0;
  }

  setPosition(input) {
    if (input.position) {
      let pos = parseInt(input.position);
      return pos;
    }
    return 0;
  }

  update(input, tally) {
    this.inputNumber = parseInt(input.number);
    this.duration = this.setDuration(input);
    this.position = this.setPosition(input);
    this.isPlaying = this.setIsPlaying(input);
    this.isOnPgm = this.setIsOnPgm(input, tally);
    this.key = input.key;
    this.title = input.title;
    this.type = input.type;
    this.setIsVideo(input.type);
  }

  setIsOnPgm(input, tally) {
    let status = tally[input.number - 1];

    if (status == '1') {
      return true;
    } else {
      return false;
    }
  }
}
