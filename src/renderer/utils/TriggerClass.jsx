import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

class Layer {
  layer = 1;
  input = 1;
  multiviewCommand = '';
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

  setMultiviewCommand(command) {
    this.multiviewCommand = command;
  }
}

class Color {
  color = '#5300eb';
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
  time = 120;
  isDown = false;
  isUp = false;
  layers = [];
  colors = [];
  color = '#aaa';
  playPauses = [];
  id = '';

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
