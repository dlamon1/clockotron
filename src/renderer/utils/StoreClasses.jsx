import { makeAutoObservable } from 'mobx';

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

  constructor(id, type) {
    this.id = id;
    this.type = type;
    makeAutoObservable(this);
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
}
