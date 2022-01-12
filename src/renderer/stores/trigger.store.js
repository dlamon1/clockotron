import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

class Layer {
  layer = 1;
  input = 1;
  command = '';
  id = '';

  constructor() {
    const id = uuidv4();
    this.id = id;
    makeAutoObservable(this);
  }

  setLayer(layer) {
    this.layer = layer;
  }

  setInput(input) {
    this.input = input;
  }

  setCommand(command) {
    this.command = command;
  }
}

class Color {
  color = '#00FF50';
  id = '';

  constructor() {
    const id = uuidv4();
    this.id = id;
    makeAutoObservable(this);
  }

  setColor(color) {
    this.color = color;
  }
}

class PlayPause {
  id = '';
  input = 1;
  command = '';

  constructor() {
    const id = uuidv4();
    this.id = id;
    makeAutoObservable(this);
  }

  setInput(input) {
    this.input = input;
  }
  setCommand(command) {
    this.command = command;
  }
}

export class Trigger {
  id = '';
  time = 120;
  isDown = true;
  isUp = false;
  layers = [];
  colors = [];
  playPauses = [];
  color = '#00FF50';
  fontColor = '#fff';

  constructor() {
    const id = uuidv4();
    this.id = id;
    makeAutoObservable(this);
  }

  setTime(time) {
    this.time = time;
  }

  setIsDown(boolean) {
    this.isDown = boolean;
  }
  setIsUp(boolean) {
    this.isUp = boolean;
  }

  setColor(color) {
    this.color = color;
  }

  setFontColor() {
    if (
      this.color == '#000000' ||
      this.color == '#5300eb' ||
      this.color == '#1b46f2'
    ) {
      this.fontColor = '#fff';
    } else {
      this.fontColor = '#000';
    }
  }

  addLayer() {
    let newLayer = new Layer();
    this.layers.push(newLayer);
  }
  addColor() {
    let newColor = new Color();
    this.colors.push(newColor);
  }
  addPlayPause() {
    let newPlayPause = new PlayPause();
    this.playPauses.push(newPlayPause);
  }
}
