import { makeAutoObservable } from 'mobx';
import { ColorCheckpoint } from './ColorClass';
import { Trigger } from './TriggerClass';
import { v4 as uuidv4 } from 'uuid';

export class Timer {
  id = '';
  color = '#00FF50';
  input = '';
  text = '';
  currentSeconds = 0;
  formatedTime = '00:00:01';
  isRunning = false;
  type = 'tod';
  resetSeconds = 0;
  formatPositions = 3;
  isCountingDown = true;
  countUpAfterDownReachesZero = false;
  colors = [];
  triggers = [];
  downColor = '#00FF50';
  upColor = '#FF0000';
  downFontColor = '#000';
  upFontColor = '#000';

  constructor(type) {
    const id = uuidv4();
    this.id = id;
    this.type = type;
    this.addColor('#00FF50', 100000000, true);
    this.addColor('#FF0000', 100000000, false);
    makeAutoObservable(this);
  }

  addColor(color, time, isDown) {
    let newColor = new ColorCheckpoint(color, time, isDown);
    this.colors.push(newColor);
  }
  addTrigger() {
    let newTrigger = new Trigger();
    this.triggers.push(newTrigger);
  }
  removeTrigger(id) {
    let index = this.triggers.map((trigger) => trigger.id).indexOf(id);
    if (index > -1) {
      this.triggers.splice(index, 1);
      // console.log("Result", arrayObject);
    }
  }

  getFontColor(color) {
    if (color == '#000000' || color == '#5300eb' || color == '#1b46f2') {
      return '#fff';
    } else {
      return '#000';
    }
  }

  setDownColor(color) {
    this.downColor = color;
    let fontColor = this.getFontColor(color);
    this.downFontColor = fontColor;
  }

  setUpColor(color) {
    this.upColor = color;
    let fontColor = this.getFontColor(color);
    this.upFontColor = fontColor;
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
