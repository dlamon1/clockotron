import { makeAutoObservable } from 'mobx';

export class ColorCheckpoint {
  color = '#5300eb';
  time = 120;
  isDown = true;

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
}
