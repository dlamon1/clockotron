import { makeAutoObservable } from 'mobx';
import { XMLParser } from 'fast-xml-parser';
import { options } from '../utils/options';
import { setDriftlessTimeout, clearDriftless } from 'driftless';

export class VideoReader {
  videoInputs = [];
  pgmArray = [];
  videoInputsInPgm = [];
  input = '';
  text = '';
  formatPositions = 3;
  currentSeconds = 0;
  color = '#00FF50';
  formatedTime = '00:00:00';

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

  handleNewVideoXmlData(data) {
    let inputs = this.parseXmlData(data);
    inputs.forEach((input) => {
      let index = this.checkForInput(input.key);
      if (index == -1) {
        this.addInput(input);
      } else {
        this.updateInput(index, input);
      }
    });
  }

  parseXmlData(data) {
    const parser = new XMLParser(options);
    let jsonObj = parser.parse(data);
    let list = jsonObj.xml.vmix.inputs.input;
    return list;
  }

  handleNewTallyData(data) {
    // let a = data.split('');
    // console.log(data);
    let pgmArray = [];
    for (let i = 0; i < data.length; i++) {
      if ('1' == data[i]) {
        // console.log(i + 1);
        pgmArray.push(i + 1);
      }
    }
    this.pgmArray = pgmArray;
    // console.log(this.pgmArray, pgmArray);
  }

  checkForInput(key) {
    let res = this.videoInputs.findIndex((input) => input.key == key);
    return res;
  }

  addInput(inputObj) {
    let input = new Input(inputObj);
    this.videoInputs.push(input);
  }

  updateInput(index, data) {
    this.videoInputs[index].update(data);
  }

  checkPgmForVideo() {
    let a = [];
    for (let i = 0; i < this.pgmArray.length; i++) {
      // console.log(this.pgmArray[i]);
      let index = this.videoInputs.findIndex(
        (input) => input.inputNumber === this.pgmArray[i]
      );
      // console.log(index);
      if (index >= 0) {
        this.handlePlayingVideoInProgram(i);
        // let input = new CurrentlyPlayingInput(this.inputs[index]);
        a.push(this.videoInputs[index]);
      }
      // console.log(a);
    }
    this.videoInputsInPgm.splice(0, this.videoInputsInPgm.length, ...a);
    // console.log(this.videoInputsInPgm);
  }

  handlePlayingVideoInProgram(i) {
    // console.log(i);
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

  constructor(input) {
    makeAutoObservable(this);
    this.inputNumber = parseInt(input.number);
    this.key = input.key;
    this.duration = this.setDuration(input);
    this.position = this.setPosition(input);
    this.isPlaying = this.setIsPlaying(input);
    this.title = input.title;
    this.clock();
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

  update(input) {
    this.inputNumber = parseInt(input.number);
    this.duration = this.setDuration(input);
    this.position = this.setPosition(input);
    this.isPlaying = this.setIsPlaying(input);
    this.title = input.title;
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
