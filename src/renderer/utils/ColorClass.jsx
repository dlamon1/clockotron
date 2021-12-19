import { makeAutoObservable } from 'mobx';

export class ColorCheckpoint {
  color = '#5300eb';
  time = 120;
  isDown = true;
  layer = 1;
  input = 1;
  doesToggle = false;
  multiviewCommand = '';

  constructor(color, time, isDown) {
    this.color = color;
    this.time = time;
    this.isDown = isDown;
    makeAutoObservable(this);
  }

  setColor(color) {
    this.color = color;
  }

  setTime(time) {
    this.time = time;
  }

  setIsDown(boolean) {
    this.isDown = boolean;
  }
  s;

  setInput(input) {
    this.input = input;
  }

  setLayer(layer) {
    this.layer = layer;
  }

  setDoesToggle(boolean) {
    this.doesToggle = boolean;
  }

  setMultiviewCommand(command) {
    this.multiviewCommand = command;
  }
}
