import { makeAutoObservable } from 'mobx';
import { XMLParser } from 'fast-xml-parser';
import { options } from '../utils/options';
import { setDriftlessTimeout, clearDriftless } from 'driftless';

let videoTypes = ['Video', 'VideoList'];

export class VideoReader {
  vmixInputs = [];
  pgmString = '';
  vmixInputsInPgm = [];
  tallyArray = [];

  constructor() {
    makeAutoObservable(this);
  }

  handleNewVideoXmlData(data) {
    // console.log('new xml');

    let inputs = this.parseXmlData(data);

    inputs.forEach((input) => {
      let index = this.checkForInput(input.key);
      if (index == -1) {
        this.addInput(input);
        // console.log('here');
      } else {
        this.updateInputXmlData(index, input, this.tallyArray);
        // console.log('here');
      }
    });

    return;
  }

  parseXmlData(data) {
    const parser = new XMLParser(options);
    let jsonObj = parser.parse(data);
    let list = jsonObj.xml.vmix.inputs.input;
    return list;
  }

  parseXmlDataForTally(data) {
    const parser = new XMLParser(options);
    let jsonObj = parser.parse(data);
    let list = jsonObj.xml.vmix.active;
    return list;
  }

  handleNewTallyData(data) {
    this.tallyArray = data.split('');
    console.log('here');
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
  currentSeconds = 1000;
  ref = null;
  input = '';
  text = '';
  formatPositions = 3;
  currentSeconds = 0;
  color = '#00FF50';
  formatedTime = '00:00:00';
  type = '';
  isVideo = false;

  constructor(input) {
    makeAutoObservable(this);
    this.inputNumber = parseInt(input.number);
    this.key = input.key;
    this.duration = this.setDuration(input);
    this.position = this.setPosition(input);
    this.isPlaying = this.setIsPlaying(input);
    this.title = input.title;
    this.type = input.type;
    this.clock();
    this.setIsVideo(input.type);
    // console.log(this);
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

  setFormatPositions(num) {
    if (this.formatPositions + num < 4 && this.formatPositions + num > 0) {
      this.formatPositions = this.formatPositions + num;
    }
  }

  clock() {
    if (this.currentSeconds > 0) {
      this.currentSeconds = this.currentSeconds - 1;

      this.ref = setDriftlessTimeout(() => this.clock(), 1000);
    }
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
    this.title = input.title;
  }

  setIsOnPgm(input, tally) {
    // console.log(input.number - 1);

    let status = tally[input.number - 1];

    if (status == '1') {
      return true;
    } else {
      return false;
    }
  }
}

let res = {
  text: 'Video',
  audiobusses: 'M',
  balance: '0',
  duration: '59426',
  key: 'fc8b5d74-c66e-4a76-979a-a326ecfe6206',
  loop: 'False',
  meterF1: '0',
  meterF2: '0',
  muted: 'False',
  number: '4',
  position: '0',
  shortTitle: 'Video',
  solo: 'False',
  state: 'Running',
  title: 'Video',
  type: 'Video',
  volume: '100',
};
