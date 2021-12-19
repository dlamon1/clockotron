import { makeAutoObservable } from 'mobx';
import { ColorCheckpoint } from './ColorClass';

export class Timer {
  color = '#5300eb';
  input = '';
  text = '';
  currentSeconds = 0;
  formatedTime = '00:00:01';
  isRunning = false;
  color1 = '#00FF50';
  color2 = '#FCCB00';
  color3 = '#FF0000';
  color4 = '#FFF';
  color2Time = 120;
  color3Time = 30;
  color4Time = 10;
  type = 'tod';
  resetSeconds = 0;
  formatPositions = 3;
  isCountingDown = true;
  countUpAfterDownReachesZero = false;
  colors = [];

  constructor(id, type) {
    this.id = id;
    this.type = type;
    this.addColor('#00FF50', 100000000, true);
    this.addColor('#FCCB00', 60, true);
    this.addColor('#FF0000', 30, true);
    this.addColor('#FFF', 0, true);
    this.addColor('#00FF50', 100000000, false);
    this.addColor('#FCCB00', 60, false);
    this.addColor('#FF0000', 30, false);
    this.addColor('#FFF', 10, false);
    makeAutoObservable(this);
  }

  addColor(color, time, isDown) {
    let newColor = new ColorCheckpoint(color, time, isDown);
    this.colors.push(newColor);
  }

  setColor1(color) {
    this.color1 = color;
  }
  setColor2(color) {
    this.color2 = color;
  }
  setColor3(color) {
    this.color3 = color;
  }
  setColor4(color) {
    this.color4 = color;
  }

  setColor2Time(time) {
    this.color2Time = time;
  }
  setColor3Time(time) {
    this.color3Time = time;
  }
  setColor4Time(time) {
    this.color4Time = time;
  }

  setCurrentSeconds(time) {
    if (this.currentSeconds + time >= 0) {
      this.currentSeconds = time;
    } else {
      this.isRunning(false);
    }
  }

  setFormatedTime(time) {
    this.formatedTime = time;
  }

  setIsRunning(boolean) {
    this.isRunning = boolean;
  }

  setColor(color) {
    this.color = color;
  }

  setInput(input) {
    this.input = input;
  }

  setText(text) {
    this.text = text;
  }

  setResetSeconds(time) {
    this.resetSeconds = time;
  }

  setFormatPositions(num) {
    if (this.formatPositions + num < 4 && this.formatPositions + num > 0) {
      this.formatPositions = this.formatPositions + num;
    }
  }

  setIsCountingDown(boolean) {
    this.isCountingDown = boolean;
  }

  setCountUpAfterDownReachesZero(boolean) {
    this.countUpAfterDownReachesZero = boolean;
  }
}
