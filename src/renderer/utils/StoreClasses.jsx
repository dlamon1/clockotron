import { makeAutoObservable } from 'mobx';
import { ColorCheckpoint } from './ColorClass';
import { Trigger } from './TriggerClass';
import { v4 as uuidv4 } from 'uuid';

export class Timer {
  id = '';
  color = '#5300eb';
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

  constructor(type) {
    const id = uuidv4();
    this.id = id;
    this.type = type;
    this.addColor('#00FF50', 100000000, true);
    this.addColor('#00FF50', 100000000, false);
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
